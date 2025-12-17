const mongoose = require('mongoose');

// Transit Pass Schema
const transitPassSchema = new mongoose.Schema({
  passNo: String,
  serial: Number,
  book: String,
  fromDateTime: Date,
  toDateTime: Date,
  circle: String,
  quarry: String,
  licensee: String,
  destination: String,
  route: String,
  mineral: String,
  permitNo: String,
  permitDate: String, // YYYY-MM-DD
  quantity: String,
  vehicle: String,
  length: String,
  breadth: String,
  height: String,
  cubicContent: String,
  grossWeight: String,
  tareWeight: String,
  mineralWeight: String,
  driverName: String,
  district: String,
  tahasil: String,
  carrierType: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Static method to generate next pass number
transitPassSchema.statics.generatePassNo = async function() {
  // Get today's count to determine serial number
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const todayCount = await this.countDocuments({
    createdAt: {
      $gte: today,
      $lt: tomorrow
    }
  });
  
  const serial = todayCount + 1;
  
  // Format: A25{MMDDHHSS}/1/{serial}
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const time = now.toLocaleTimeString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).replace(/[\s:]/g, '');
  
  const dateTimeStr = `${month}${day}${time}`;
  const passNo = `A25${dateTimeStr}/1/${serial}`;
  
  return { passNo, serial };
};

module.exports = mongoose.model('TransitPass', transitPassSchema);
