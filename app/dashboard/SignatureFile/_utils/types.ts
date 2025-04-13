export interface Contact {
  userName: string;
  email: string;
  userPhoneNumber: any;
}

export interface SignaturePosition {
  id?: string;
  xPosition: number;
  yPosition: number;
  page: number;
  userEmail: string;
  userId?: string;
  userPhoneNumber?: any;
}

export interface TextField {
  id: string;
  xPosition: number;
  yPosition: number;
  page: number;
  text: string;
  width: number;
  height: number;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
}
