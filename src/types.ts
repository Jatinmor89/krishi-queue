export type Language = 'en' | 'pa' | 'hi';

export type AppMode = 
  | 'farmer-home' 
  | 'farmer-booking' 
  | 'farmer-track' 
  | 'farmer-bookings-list' 
  | 'farmer-profile'
  | 'logistics-tenders'
  | 'mandi-console';

export interface FarmerProfileData {
  id: string;
  name: string;
  nameHi: string;
  namePa: string;
  verified: boolean;
  registeredCrop: string;
  phone: string;
  village: string;
  district: string;
  state: string;
  landArea: string;
  pmKisanLinked: boolean;
  bankAccount: string;
  ifsc: string;
  activeToken: string;
  gatePassDate: string;
  slotTime: string;
  assignedGate: string;
  weighbridge: string;
}

export interface SlotTimeWave {
  id: string;
  timeRange: string;
  waveName: string;
  slotsRemaining: number;
  expectedWaitMins: number;
  queuePosition: number;
  status: 'available' | 'full' | 'optimal';
  tag?: string;
}

export interface DateSlotOption {
  dayNumber: number;
  dayName: string;
  dayNameHi: string;
  fullDate: string;
  totalSlots: number;
  tag?: string;
  isRainWarning?: boolean;
}

export interface ProcurementQueueItem {
  tokenId: string;
  farmerName: string;
  crop: string;
  variety: string;
  weightQtl: number;
  intakeStage: 'Quality Check' | 'Weighbridge In' | 'Unloading Shed B' | 'J-Form Ready';
  gate: string;
  verificationOfficer: string;
  officerNote?: string;
  actionType: 'moisture' | 'tare' | 'bay' | 'jform';
}

export interface TransitTruck {
  plateNo: string;
  transporter: string;
  route: string;
  consignment: string;
  status: 'on-time' | 'delayed' | 'delivered';
  delayReason?: string;
  eta: string;
  speed: string;
  geoFenceVerified: boolean;
  receiptNo?: string;
}

export interface TenderBidder {
  rank: number;
  name: string;
  badge?: string;
  ratePerQtl: number;
  isUser?: boolean;
  trailingGap?: number;
}
