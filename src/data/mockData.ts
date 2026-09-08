import { FarmerProfileData, DateSlotOption, SlotTimeWave, ProcurementQueueItem, TransitTruck, TenderBidder } from '../types';

export const GOV_EMBLEM_URL = "https://lh3.googleusercontent.com/aida/AEtjO1W5jZxjNtRmaybMf6_zuw7ohx8JKQ-9E_sg1uviXhKIKbXIWJlImAZMIyadR8RUB4UMpCBpmXuIaEKTSj6bcng41JmUATd7LAjhLbs1KChCqLTGYmn63eaAcvChEWxJB70rhQFsMCkqrFWAmghtWFsy_Y_Kad0TBsx0p_iccMei0erj92zGhv_2ex0JO4RF4aCJGDYVU1wP6_SCtYtAw-7kRqyeKWQd_XgM7aOz_GtWmjQXQFvSu4zosp5l";
export const FARMER_PORTRAIT_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDBZHkm6TUcpBoiXbteQx2_hTJouO5FYe7QA32UxmhBSG840Ss7i7kfswz4sLOFjxZe2BsZjlTPaQqz0xbJq7LSnzLdsq9fY5tNTHk9sk6f4xtEAVH8kfH9rCGkq_tCwR6O8AhbkcS-p3Fydk_kVRGMp9wQmmUPUWZpIYDV2_sVKdcTmfxYmYHIMCzXx1Z3C0gP4MfFH7BUjBEvrHqF_UROi4Fh1EYCZwu6XHx5VwPMu_nqTHCtRQ2Xuw";

export const initialFarmerProfile: FarmerProfileData = {
  id: "PB-2024-KRN-8841",
  name: "Balwinder Singh Ji",
  nameHi: "बलविंदर सिंह जी",
  namePa: "ਬਲਵਿੰਦਰ ਸਿੰਘ ਜੀ",
  verified: true,
  registeredCrop: "Wheat (PBW-550 कनक)",
  phone: "+91 98765-43210",
  village: "Taraori, Nilokheri Block",
  district: "Karnal",
  state: "Haryana",
  landArea: "12.5 Acres (Khasra #42/18)",
  pmKisanLinked: true,
  bankAccount: "State Bank of India •••• 8842",
  ifsc: "SBIN0001248",
  activeToken: "#KQ-8821",
  gatePassDate: "Thursday, 24 Oct 2024",
  slotTime: "08:30 AM - 10:30 AM",
  assignedGate: "Gate No. 3 (गेट ३)",
  weighbridge: "Tractor Weighbridge #2"
};

export const dateSlotOptions: DateSlotOption[] = [
  { dayNumber: 24, dayName: "Thu / गुरु", dayNameHi: "गुरुवार", fullDate: "Thursday, 24 October 2024", totalSlots: 74, tag: "TODAY" },
  { dayNumber: 25, dayName: "Fri / शुक्र", dayNameHi: "शुक्रवार", fullDate: "Friday, 25 October 2024", totalSlots: 16, tag: "Rain", isRainWarning: true },
  { dayNumber: 26, dayName: "Sat / शनि", dayNameHi: "शनिवार", fullDate: "Saturday, 26 October 2024", totalSlots: 98, tag: "Fast pass" },
  { dayNumber: 27, dayName: "Sun / रवि", dayNameHi: "रविवार", fullDate: "Sunday, 27 October 2024", totalSlots: 40, tag: "Normal" },
  { dayNumber: 28, dayName: "Mon / सोम", dayNameHi: "सोमवार", fullDate: "Monday, 28 October 2024", totalSlots: 85, tag: "Open" },
  { dayNumber: 29, dayName: "Tue / मंगल", dayNameHi: "मंगलवार", fullDate: "Tuesday, 29 October 2024", totalSlots: 60, tag: "Regular" }
];

export const slotTimeWaves: SlotTimeWave[] = [
  {
    id: "wave-1",
    timeRange: "06:30 AM – 08:30 AM",
    waveName: "Morning Wave 1 • Low Heat Exposure",
    slotsRemaining: 18,
    expectedWaitMins: 20,
    queuePosition: 6,
    status: "available",
    tag: "Cool Yard"
  },
  {
    id: "wave-2",
    timeRange: "08:30 AM – 10:30 AM",
    waveName: "Peak Wave • Mandi capacity reached",
    slotsRemaining: 0,
    expectedWaitMins: 45,
    queuePosition: 28,
    status: "full"
  },
  {
    id: "wave-3",
    timeRange: "10:30 AM – 12:30 PM",
    waveName: "Midday Wave • Shed #2 Unloading",
    slotsRemaining: 12,
    expectedWaitMins: 35,
    queuePosition: 14,
    status: "optimal",
    tag: "OPTIMAL"
  },
  {
    id: "wave-4",
    timeRange: "01:30 PM – 03:30 PM",
    waveName: "Afternoon Shift • Maintenance Break",
    slotsRemaining: 0,
    expectedWaitMins: 60,
    queuePosition: 35,
    status: "full"
  },
  {
    id: "wave-5",
    timeRange: "03:30 PM – 05:30 PM",
    waveName: "Evening Wave • Low Yard Congestion",
    slotsRemaining: 29,
    expectedWaitMins: 15,
    queuePosition: 4,
    status: "available",
    tag: "Fast Track"
  }
];

export const mockProcurementQueue: ProcurementQueueItem[] = [
  {
    tokenId: "KQ-8821",
    farmerName: "Balwinder Singh",
    crop: "Wheat",
    variety: "Kalyan Sona",
    weightQtl: 45,
    intakeStage: "Quality Check",
    gate: "Gate 2",
    verificationOfficer: "Inspector R. Sharma",
    officerNote: "Moisture: 11.2% (Passed FAQ standard)",
    actionType: "moisture"
  },
  {
    tokenId: "KQ-8822",
    farmerName: "Harpreet Kaur",
    crop: "Wheat",
    variety: "PBW-550",
    weightQtl: 60,
    intakeStage: "Weighbridge In",
    gate: "Gate 1",
    verificationOfficer: "Weighman D. Pal",
    officerNote: "Gross: 12.4 MT • Tare: 6.4 MT",
    actionType: "tare"
  },
  {
    tokenId: "KQ-8823",
    farmerName: "Ram Avtar Yadav",
    crop: "Wheat",
    variety: "Sharbati",
    weightQtl: 35,
    intakeStage: "Unloading Shed B",
    gate: "Gate 3",
    verificationOfficer: "Labour Bay 4 (Arhtiya #12)",
    officerNote: "2 unloading gangs active • 18 bags/min",
    actionType: "bay"
  },
  {
    tokenId: "KQ-8824",
    farmerName: "Gurdeep Singh",
    crop: "Wheat",
    variety: "HD-2967",
    weightQtl: 50,
    intakeStage: "J-Form Ready",
    gate: "Counter 2",
    verificationOfficer: "Cashier P. Swamy",
    officerNote: "Approved DBT: ₹1,13,750",
    actionType: "jform"
  }
];

export const mockTransitTrucks: TransitTruck[] = [
  {
    plateNo: "HR-37-D-9120",
    transporter: "Kisan Express Fleet",
    route: "Karnal APMC → Panipat FCI Silo",
    consignment: "400 Qtl (Grade-A Wheat)",
    status: "on-time",
    eta: "14:15 (Remaining 18 km)",
    speed: "42 km/h",
    geoFenceVerified: true
  },
  {
    plateNo: "HR-05-BC-3301",
    transporter: "AgroHaul Logistics",
    route: "Karnal APMC → Kurukshetra Silo",
    consignment: "380 Qtl (Sharbati FAQ)",
    status: "delayed",
    delayReason: "Toll Plaza Traffic Bottleneck",
    eta: "15:30 (Delayed by 42m)",
    speed: "8 km/h",
    geoFenceVerified: true
  },
  {
    plateNo: "PB-11-F-7829",
    transporter: "Bharat Freight Logistics",
    route: "Karnal APMC → Ambala Central Depot",
    consignment: "420 Qtl (Milling Wheat)",
    status: "delivered",
    receiptNo: "FCI-AMB-881",
    eta: "Delivered & Verified",
    speed: "0 km/h",
    geoFenceVerified: true
  }
];

export const initialTenderBidders: TenderBidder[] = [
  { rank: 1, name: "Bidder #A (Verified Fleet)", badge: "Leading L1 Rate", ratePerQtl: 176 },
  { rank: 2, name: "You (Kisan Logistics)", badge: "YOURS", ratePerQtl: 178, isUser: true, trailingGap: 2 },
  { rank: 3, name: "Bidder #C", badge: "Rank 3", ratePerQtl: 182 },
  { rank: 4, name: "Bidder #D", badge: "Rank 4", ratePerQtl: 185 }
];
