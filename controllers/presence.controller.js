const Models = require('../database/db/models');
const Presence = Models.Presence;
const User = Models.User;

const geoip = require('geoip-lite');
const Sequelize = require('sequelize');
const Op = Sequelize.Op; 


const clockIn = async (req, res) => {
  try {
    // > Dapatkan IP User
    const myIp = req.ip;
    // > Dapatkan latitude dan longitude dari client
    const { latitude_in, longitude_in } = req.body;
    // console.info(myIp);

    // > Cek User Login
    const userLogin = await User.findOne({
      where: {
        id: req.user.id
      }
    });

    // > Jika User Tidak Login
    if (!userLogin) {
      return res.status(400).json({
        status: 'Failed',
        statusCode: 400,
        message: 'User Not Found!'
      });
    }

    // > Waktu dan Tanggal
    const date = new Date();
    const hours = date.getHours();
    const formattedTime = `${hours}:${date.getMinutes()}:${date.getSeconds()}`;
    const utc7Date = new Date(date.getTime() + (7 * 60 * 60 * 1000)); // Menggeser zona waktu ke UTC+7
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    const formattedDate = utc7Date.toISOString().slice(0, 19).replace('T', ' ');
    const timeZoneOffset = 7 * 60; // Offset for UTC+7 in minutes

    const currentDateInUTCPlus7 = new Date();
    currentDateInUTCPlus7.setMinutes(currentDateInUTCPlus7.getMinutes() + timeZoneOffset)
    // > Lstitude dan Longitude Dari Server
    const geo = geoip.lookup(myIp);
    let latitudeServer = '';
    let longitudeServer = '';
    if (geo && geo.ll) {
      latitudeServer = geo.ll[0];
      longitudeServer = geo.ll[1];
    } else {
      return res.status(400).json({
        status: 'Failed',
        message: 'Failed to get data geolocation!'
      });
    }

    // > Cari absen
    const findPresence = await Presence.findOne({
      where: {
        user_id: req.user.id,
        presance_date: {
          [Op.and]: [
            { [Op.gte]: `${currentDate} 00:00:00.000 +0700` }, // Greater than or equal to the current date (beginning of the day)
            { [Op.lt]: `${currentDate} 23:59:59.000 +0700` }, // Less than the next day (end of the day)
          ]
        }
      }
    });
    console.info(findPresence,currentDateInUTCPlus7, '=> absen user4');

    // > Jika user belum absen
    if (!findPresence) {
      // > Absen Tepat Waktu
      if (hours < 9) {
        const addNewPresence = await Presence.create({
          user_id: req.user.id,
          presance_date: formattedDate,
          clock_in_at: formattedTime,
          clock_out_at: null,
          ip_address: myIp,
          latitude_in,
          longitude_in,
          latitude_server_in: latitudeServer,
          longitude_server_in: longitudeServer,
          is_late: 0
        });
  
        return res.status(200).json({
          status: 'Success',
          statusCode: 200,
          message: 'Prefance Success',
          data: addNewPresence,
          prefencesStatus: 'Ontime!'
        });
      } else { // Absen telat
        const addNewPresence = await Presence.create({
          user_id: req.user.id,
          presance_date: formattedDate,
          clock_in_at: formattedTime,
          clock_out_at: null,
          ip_address: myIp,
          latitude_in,
          longitude_in,
          latitude_server_in: latitudeServer,
          longitude_server_in: longitudeServer,
          is_late: 1
        });
  
        return res.status(200).json({
          status: 'Success',
          statusCode: 200,
          message: 'Prefance Success',
          data: addNewPresence,
          prefencesStatus: 'Late!'
        });
      }
    } else {
      return res.status(200).json({
        status: 'Success',
        message: 'You have made a presence!'
      });
    }

  } catch (error) {
    return res.status(400).json({
      status: 'Failed',
      statusCode: 400,
      message: 'Something Error in clockIn Controller',
      error: error.message
    });
  }
};

const clockOut = async (req, res) => {
  try {
    // > Dapatkan IP User
    const myIp = req.ip;
    // > Dapatkan latitude dan longitude dari client
    const { latitude_out, longitude_out } = req.body;
    // console.info(myIp);

    // > Cek User Login
    const userLogin = await User.findOne({
      where: {
        id: req.user.id
      }
    });

    // > Jika User Tidak Login
    if (!userLogin) {
      return res.status(400).json({
        status: 'Failed',
        statusCode: 400,
        message: 'User Not Found!'
      });
    }

    // > Waktu dan Tanggal
    const date = new Date();
    const hours = date.getHours();
    const formattedTime = `${hours}:${date.getMinutes()}:${date.getSeconds()}`;
    const utc7Date = new Date(date.getTime() + (7 * 60 * 60 * 1000)); // Menggeser zona waktu ke UTC+7
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    const formattedDate = utc7Date.toISOString().slice(0, 19).replace('T', ' ');
    const timeZoneOffset = 7 * 60; // Offset for UTC+7 in minutes

    const currentDateInUTCPlus7 = new Date();
    currentDateInUTCPlus7.setMinutes(currentDateInUTCPlus7.getMinutes() + timeZoneOffset)
    
    // > Lstitude dan Longitude Dari Server
    const geo = geoip.lookup(myIp);
    let latitudeServer = '';
    let longitudeServer = '';
    if (geo && geo.ll) {
      latitudeServer = geo.ll[0];
      longitudeServer = geo.ll[1];
    } else {
      return res.status(400).json({
        status: 'Failed',
        message: 'Failed to get data geolocation!'
      });
    }

    // > Cari absen
    const findPresence = await Presence.findOne({
      where: {
        user_id: req.user.id,
        presance_date: {
          [Op.and]: [
            { [Op.gte]: `${currentDate} 00:00:00.000 +0700` }, // Greater than or equal to the current date (beginning of the day)
            { [Op.lt]: `${currentDate} 23:59:59.000 +0700` }, // Less than the next day (end of the day)
          ]
        }
      }
    });
    // console.info(findPresence,currentDateInUTCPlus7, '=> absen user4');

    // > Jika user sudah absen bisa update waktu balik
    if (findPresence && findPresence.clock_out_at == null) {
      // > Absen Balik
      const updatePresence = await findPresence.update({
        clock_out_at: formattedTime,
        latitude_out,
        longitude_out,
        latitude_server_out: latitudeServer,
        longitude_server_out: longitudeServer
      });

      return res.status(200).json({
        status: 'Success',
        statusCode: 200,
        message: 'Prefance Success',
        data: updatePresence,
        prefencesStatus: 'Have a nice rest!'
      });
    } else {
      return res.status(400).json({
        status: 'Failed',
        statusCode: 400,
        message: "You haven't been absent yet!"
      });
    }

  } catch (error) {
    return res.status(400).json({
      status: 'Failed',
      statusCode: 400,
      message: 'Something Error in clockIn Controller',
      error: error.message
    });
  }
};

module.exports = {
  clockIn,
  clockOut
};