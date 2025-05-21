const nodemailer = require('nodemailer');
const geoip = require('geoip-lite');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Fungsi untuk mendapatkan info lokasi
const getLocationInfo = (ip) => {
  const geo = geoip.lookup(ip);
  return geo ? 
    `${geo.city}, ${geo.region}, ${geo.country}` : 
    'Lokasi tidak terdeteksi';
};

// Template email
exports.sendNotificationEmail = async (user, type, req) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const location = getLocationInfo(ip);
  const time = new Date().toLocaleString('id-ID');
  
  const emailConfig = {
    from: `"Twitter Clone" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: type === 'register' ? 
      'Selamat datang di Twitter Clone!' : 
      'Notifikasi Login Baru',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1DA1F2;">Twitter Clone</h2>
        ${type === 'register' ? `
          <p>Halo ${user.username},</p>
          <p>Akun Anda berhasil dibuat dengan detail:</p>
          <ul>
            <li>Username: ${user.username}</li>
            <li>Email: ${user.email}</li>
            <li>Waktu Registrasi: ${time}</li>
          </ul>
        ` : `
          <p>Halo ${user.username},</p>
          <p>Ada login baru ke akun Anda:</p>
          <ul>
            <li>Waktu: ${time}</li>
            <li>Lokasi: ${location}</li>
            <li>IP Address: ${ip}</li>
            <li>Device: ${req.headers['user-agent']}</li>
          </ul>
          <p>Jika ini bukan Anda, segera ubah password!</p>
        `}
        <hr style="border: 1px solid #e1e8ed;">
        <p style="color: #657786;">Email ini dikirim otomatis, mohon tidak membalas.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(emailConfig);
    console.log('Email notification sent to:', user.email);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};