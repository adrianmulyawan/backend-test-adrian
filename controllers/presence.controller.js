const Models = require('../database/db/models');
const Presence = Models.Presence;
const User = Models.User;

const geoip = require('geoip-lite');


const clockIn = async (req, res) => {
  try {
    // > Dapatkan IP User
    const myIp = req.ip;
    // > Dapatkan latitude dan longitude dari client
    const { latitude, longitude } = req.body;
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

    // > Waktu
    const date = new Date();
    const hours = date.getHours();
    const formattedTime = `${hours}:${date.getMinutes()}:${date.getSeconds()}`;
    const utc7Date = new Date(date.getTime() + (7 * 60 * 60 * 1000)); // Menggeser zona waktu ke UTC+7
    const formattedDate = utc7Date.toISOString()
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

    console.log(currentDateInUTCPlus7)
    const findPresence = await Presence.findOne({
      where: {
        user_id: req.user.id,
        presance_date: currentDateInUTCPlus7
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
          latitude,
          longitude,
          latitude_server: latitudeServer,
          longitude_server: longitudeServer,
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
          latitude,
          longitude,
          latitude_server: latitudeServer,
          longitude_server: longitudeServer,
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