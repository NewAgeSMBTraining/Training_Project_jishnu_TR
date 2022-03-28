// import * as m from 'moment-timezone';

// export function getDateId(date: string): number {
//   return +m(date).utc().format('YYYYMMDD');
// }

// export function estDateTime(date: string | m.Moment): m.Moment {
//   return m(date).utc();
// }

// export function isExpired(date: m.Moment): boolean {
//   return date.diff(m(), 'minutes') > 5;
// }

// export function timeRemaining(date: m.Moment, unit: m.unitOfTime.Diff): number {
//   return date.diff(m(), unit);
// }

// export function getTokenCreatedTimeIn(date: m.Moment, unit: m.unitOfTime.Diff): number {
//   return m().diff(date, unit);
// }

// export function dateFormat(date: string | m.Moment, format: string): string {
//   return m(date).format(format);
// }

// export function dateFormatNow(format: string): string {
//   return m().format(format);
// }

// export function tomorrow(): m.Moment {
//   return m().add(1, 'day');
// }

// export function today(): m.Moment {
//   return m();
// }

// export function convertFilterToWhere(fl: object): object {
//   const where: { [key: string]: any } = { ...fl };
//   for (const key in where) {
//     if (where.hasOwnProperty(key)) {
//       if (!where[key]) { delete where[key]; continue; }
//       if (typeof where[key] === 'object') {
//         if (isMoment(where[key])) {
//           if (key === '$gte') {
//             where[key].set({ hour: 0, minute: 0, second: 0 });
//           } else if (key === '$lte') {
//             where[key].set({ hour: 23, minute: 59, second: 59 });
//           }
//           continue;
//         } else if (Array.isArray(where[key])) {
//           continue;
//         }
//         where[key] = convertFilterToWhere(where[key]);
//         if (Object.entries(where[key]).length === 0) { delete where[key]; }
//       } else {
//         if (key === '$gte' && isMoment(where[key])) {
//           where[key] = m(where[key]).set({ hour: 0, minute: 0, second: 0 });
//         } else if (key === '$lte' && isMoment(where[key])) {
//           where[key] = m(where[key]).set({ hour: 23, minute: 59, second: 59 });
//         }
//       }
//     }
//   }
//   return where;
// }

// export const moment = m;
// export const isMoment = m.isMoment;
