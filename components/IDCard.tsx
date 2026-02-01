
import React from 'react';
import QRCodePattern from './QRCodePattern';
import { Student, CardConfig } from '../types';
import { RemoteImage } from './Logo';

interface IDCardProps {
  student: Student;
  config: CardConfig;
  id?: string;
}

// Inline SVG Pattern to ensure reliability in PDF generation (avoids CORS)
const CubePattern = () => (
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
    style={{ 
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: '20px 20px'
    }} 
  />
);

const IDCard: React.FC<IDCardProps> = ({ student, config, id }) => {
  // Helper for applying styles with defaults
  const cardStyle: React.CSSProperties = {
    backgroundColor: config.cardBgColor,
    color: config.textColor,
    borderColor: 'rgba(30, 41, 59, 1)', // slate-800
    printColorAdjust: 'exact',
    WebkitPrintColorAdjust: 'exact',
  };

  return (
    <div id={id} className="id-card-inner-wrapper flex items-center justify-center p-4 bg-transparent rounded-xl">
      {/* BACK SIDE ONLY - 80mm x 136mm -> 400px x 680px (1:5 Scale) */}
      <div 
        className="id-card-back relative w-[400px] h-[680px] rounded-[16px] overflow-hidden shadow-2xl flex flex-col items-center px-8 py-8 shrink-0 border-[4px] justify-between"
        style={cardStyle}
      >
        
        {/* Subtle Pattern */}
        {config.showPattern && (
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        )}

        {/* Header Logo Area */}
        <div className="relative z-10 flex flex-col items-center w-full mt-2">
          <div className="mb-2"> {/* Removed container borders/bg */}
             <RemoteImage src={config.backLogoUrl} alt="Logo" className="w-32 h-32 object-contain" /> {/* Bigger */}
          </div>
          <h3 className="font-black tracking-[0.3em] text-lg" style={{ color: config.backTextColor }}>QWICKATTEND</h3>
          <div className="h-1 w-12 rounded-full mt-4" style={{ backgroundColor: config.accentColor }}></div>
        </div>

        {/* QR Code Section */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full my-4">
          <div className="p-6 rounded-3xl shadow-2xl" style={{ backgroundColor: config.qrBgColor }}>
            <QRCodePattern 
              value={student.studentId} 
              size={220} 
              color={config.qrColor}
            />
          </div>
        </div>
        
        {/* Footer Text */}
        <div className="relative z-10 flex flex-col items-center w-full">
          <div className="mb-4 px-6 py-2 bg-slate-800 rounded-full border border-slate-700 shadow-lg">
             <span className="text-sm font-mono font-bold tracking-[0.2em]" style={{ color: config.accentColor }}>
               ID: {student.studentId}
             </span>
          </div>
          
          <p 
            className="text-[11px] text-center leading-snug max-w-[340px] font-medium whitespace-pre-wrap" 
            style={{ color: config.backTextColor, opacity: 0.8 }}
          >
            {config.disclaimerText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IDCard;
