/**
 * Muscat (Sultanate of Oman) Local Time & Showroom Status Utility
 * Timezone: Asia/Muscat (GST, UTC+4, No DST)
 * 
 * Official Showroom Timings (Shop 10, Ghala Heights, Muscat):
 * - Saturday to Thursday:
 *   - Morning: 09:00 AM - 01:00 PM (09:00 - 13:00)
 *   - Evening: 04:30 PM - 10:00 PM (16:30 - 22:00)
 * - Friday:
 *   - Evening only: 04:30 PM - 10:00 PM (16:30 - 22:00) (Closed Friday morning for prayers)
 */

export interface MuscatShowroomStatus {
  isOpen: boolean;
  statusTextEn: string;
  statusTextAr: string;
  subTextEn: string;
  subTextAr: string;
  currentMuscatTime: string;
}

export function getMuscatDate(): Date {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * 4);
}

export function getMuscatShowroomStatus(): MuscatShowroomStatus {
  const muscatDate = getMuscatDate();
  const day = muscatDate.getDay(); // 0 = Sun, 1 = Mon, ..., 5 = Fri, 6 = Sat
  const hours = muscatDate.getHours();
  const minutes = muscatDate.getMinutes();
  const currentMins = hours * 60 + minutes;

  const isFriday = day === 5;
  const morningStart = 9 * 60; // 09:00 AM (540)
  const morningEnd = 13 * 60; // 01:00 PM (780)
  const eveningStart = 16 * 60 + 30; // 04:30 PM (990)
  const eveningEnd = 22 * 60; // 10:00 PM (1320)

  const timeFormatted = muscatDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // Check if currently open
  const isMorningOpen = !isFriday && currentMins >= morningStart && currentMins < morningEnd;
  const isEveningOpen = currentMins >= eveningStart && currentMins < eveningEnd;
  const isOpen = isMorningOpen || isEveningOpen;

  if (isOpen) {
    if (isMorningOpen) {
      const minsLeft = morningEnd - currentMins;
      const hrsLeft = Math.floor(minsLeft / 60);
      const remainingMins = minsLeft % 60;
      const closingMsgEn = hrsLeft > 0 ? `Closes at 1:00 PM (in ${hrsLeft}h ${remainingMins}m)` : `Closes at 1:00 PM (in ${remainingMins}m)`;
      const closingMsgAr = `يغلق 1:00 ظهراً (خلال ${hrsLeft > 0 ? `${hrsLeft} س و ` : ''}${remainingMins} د)`;

      return {
        isOpen: true,
        statusTextEn: 'Showroom Open Now',
        statusTextAr: 'المعرض مفتوح الآن',
        subTextEn: closingMsgEn,
        subTextAr: closingMsgAr,
        currentMuscatTime: timeFormatted,
      };
    } else {
      const minsLeft = eveningEnd - currentMins;
      const hrsLeft = Math.floor(minsLeft / 60);
      const remainingMins = minsLeft % 60;
      const closingMsgEn = hrsLeft > 0 ? `Closes at 10:00 PM (in ${hrsLeft}h ${remainingMins}m)` : `Closes at 10:00 PM (in ${remainingMins}m)`;
      const closingMsgAr = `يغلق 10:00 مساءً (خلال ${hrsLeft > 0 ? `${hrsLeft} س و ` : ''}${remainingMins} د)`;

      return {
        isOpen: true,
        statusTextEn: 'Showroom Open Now',
        statusTextAr: 'المعرض مفتوح الآن',
        subTextEn: closingMsgEn,
        subTextAr: closingMsgAr,
        currentMuscatTime: timeFormatted,
      };
    }
  }

  // If closed, determine next opening slot
  let nextEn = '';
  let nextAr = '';

  if (isFriday) {
    if (currentMins < eveningStart) {
      nextEn = 'Opens today at 4:30 PM (Friday)';
      nextAr = 'يفتح اليوم الساعة 4:30 عصراً (الجمعة)';
    } else {
      nextEn = 'Opens tomorrow (Saturday) at 9:00 AM';
      nextAr = 'يفتح غداً (السبت) الساعة 9:00 صباحاً';
    }
  } else {
    if (currentMins < morningStart) {
      nextEn = 'Opens today at 9:00 AM';
      nextAr = 'يفتح اليوم الساعة 9:00 صباحاً';
    } else if (currentMins >= morningEnd && currentMins < eveningStart) {
      nextEn = 'Opens today at 4:30 PM (Evening Shift)';
      nextAr = 'يفتح اليوم 4:30 عصراً (الفترة المسائية)';
    } else {
      // After 10 PM
      if (day === 4) {
        // Thursday night -> next is Friday 4:30 PM
        nextEn = 'Opens tomorrow (Friday) at 4:30 PM';
        nextAr = 'يفتح غداً (الجمعة) الساعة 4:30 عصراً';
      } else {
        nextEn = 'Opens tomorrow at 9:00 AM';
        nextAr = 'يفتح غداً الساعة 9:00 صباحاً';
      }
    }
  }

  return {
    isOpen: false,
    statusTextEn: 'Showroom Closed',
    statusTextAr: 'المعرض مغلق حالياً',
    subTextEn: nextEn,
    subTextAr: nextAr,
    currentMuscatTime: timeFormatted,
  };
}

/**
 * Calculates remaining hours and minutes until Muscat same-day dispatch cutoff (5:00 PM GST)
 */
export function getSameDayDeliveryCountdown(): {
  eligible: boolean;
  hoursLeft: number;
  minutesLeft: number;
  formattedEn: string;
  formattedAr: string;
} {
  const muscatDate = getMuscatDate();
  const hours = muscatDate.getHours();
  const minutes = muscatDate.getMinutes();
  const currentMins = hours * 60 + minutes;
  const cutoffMins = 17 * 60; // 5:00 PM cutoff for same-day delivery

  if (currentMins < cutoffMins) {
    const diff = cutoffMins - currentMins;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    return {
      eligible: true,
      hoursLeft: h,
      minutesLeft: m,
      formattedEn: `Order within ${h}h ${m}m for Free Same-Day Delivery in Muscat`,
      formattedAr: `اطلب خلال ${h} ساعة و ${m} دقيقة للتوصيل المجاني بنفس اليوم داخل مسقط`,
    };
  }

  return {
    eligible: false,
    hoursLeft: 0,
    minutesLeft: 0,
    formattedEn: 'Order now for Express Delivery tomorrow morning across Muscat & Oman',
    formattedAr: 'اطلب الآن للتوصيل السريع صباح الغد لكافة مناطق مسقط وسلطنة عُمان',
  };
}
