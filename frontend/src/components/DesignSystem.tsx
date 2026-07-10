/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  AlertCircle, 
  X, 
  Info, 
  CheckCircle, 
  TrendingUp, 
  User, 
  Award,
  BookOpen,
  Brain,
  MessageSquare
} from 'lucide-react';

// ==========================================
// BUTTONS
// ==========================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyle = "font-sans font-semibold rounded-xl transition-all duration-200 inline-flex items-center justify-center cursor-pointer select-none border";
  
  const variants = {
    primary: "bg-brand-primary border-brand-primary text-white hover:bg-blue-700 active:scale-95 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm shadow-blue-200",
    secondary: "bg-brand-secondary border-brand-secondary text-brand-text-main hover:bg-amber-500 active:scale-95 focus:ring-2 focus:ring-amber-300 focus:outline-none shadow-sm shadow-amber-100",
    outline: "bg-white border-slate-200 text-brand-text-main hover:bg-slate-50 hover:border-slate-300 active:scale-95 focus:ring-2 focus:ring-slate-100 focus:outline-none",
    danger: "bg-brand-danger border-brand-danger text-white hover:bg-red-600 active:scale-95 focus:ring-2 focus:ring-red-200 focus:outline-none shadow-sm shadow-red-100"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// ==========================================
// INPUTS & SELECTS
// ==========================================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  id,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-brand-text-main select-none">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3.5 text-brand-text-sub pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={`w-full font-sans text-sm text-brand-text-main placeholder-slate-400 bg-white border rounded-xl px-4 py-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:border-brand-primary ${
            icon ? 'pl-10' : ''
          } ${
            error 
              ? 'border-brand-danger focus:ring-red-100' 
              : 'border-slate-200 focus:ring-blue-100'
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-brand-danger flex items-center gap-1 mt-0.5">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  className = '',
  id,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-brand-text-main select-none">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full font-sans text-sm text-brand-text-main bg-white border rounded-xl px-4 py-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:border-brand-primary ${
          error 
            ? 'border-brand-danger focus:ring-red-100' 
            : 'border-slate-200 focus:ring-blue-100'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-brand-danger flex items-center gap-1 mt-0.5">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
    </div>
  );
};

// ==========================================
// CHECKBOX & RADIO
// ==========================================
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, id, className = '', ...props }) => {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer select-none group text-sm text-brand-text-main">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={id}
          className="peer sr-only"
          {...props}
        />
        <div className="w-5 h-5 border border-slate-200 rounded-lg bg-white transition-all duration-200 peer-checked:bg-brand-primary peer-checked:border-brand-primary peer-focus:ring-2 peer-focus:ring-blue-100" />
        <Check className="w-3.5 h-3.5 text-white absolute scale-0 transition-transform duration-200 peer-checked:scale-100" />
      </div>
      <span className="group-hover:text-brand-text-main/80 transition-colors">{label}</span>
    </label>
  );
};

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Radio: React.FC<RadioProps> = ({ label, id, name, className = '', ...props }) => {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer select-none group text-sm text-brand-text-main">
      <div className="relative flex items-center justify-center">
        <input
          type="radio"
          id={id}
          name={name}
          className="peer sr-only"
          {...props}
        />
        <div className="w-5 h-5 border border-slate-200 rounded-full bg-white transition-all duration-200 peer-checked:border-brand-primary peer-focus:ring-2 peer-focus:ring-blue-100" />
        <div className="w-2.5 h-2.5 bg-brand-primary rounded-full absolute scale-0 transition-transform duration-200 peer-checked:scale-100" />
      </div>
      <span className="group-hover:text-brand-text-main/80 transition-colors">{label}</span>
    </label>
  );
};

// ==========================================
// CARDS & BADGES & TAGS
// ==========================================
interface CardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', id, onClick }) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md/5 transition-all duration-200 p-5 ${
        onClick ? 'cursor-pointer hover:border-slate-200' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'slate';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'primary', children, className = '' }) => {
  const styles = {
    primary: "bg-blue-50 text-brand-primary border-blue-100",
    secondary: "bg-amber-50 text-amber-700 border-amber-100",
    success: "bg-emerald-50 text-brand-success border-emerald-100",
    danger: "bg-red-50 text-brand-danger border-red-100",
    slate: "bg-slate-50 text-brand-text-sub border-slate-100"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};

interface TagProps {
  subject: string;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ subject, className = '' }) => {
  const getSubjectColor = (sub: string) => {
    switch (sub.toLowerCase()) {
      case 'matemática':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'física':
        return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'química':
        return 'bg-pink-50 text-pink-700 border-pink-100';
      case 'ciências':
      case 'biologia':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'história':
      case 'geografia':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'redação':
      case 'português':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium border ${getSubjectColor(subject)} ${className}`}>
      {subject}
    </span>
  );
};

// ==========================================
// UPLOAD ZONE
// ==========================================
interface UploadZoneProps {
  onFileSelect?: (file: { name: string; size: string }) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string } | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + " MB";
      const fileData = { name: file.name, size: sizeStr };
      setSelectedFile(fileData);
      onFileSelect?.(fileData);
    }
  };

  const triggerSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + " MB";
      const fileData = { name: file.name, size: sizeStr };
      setSelectedFile(fileData);
      onFileSelect?.(fileData);
    }
  };

  return (
    <div 
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 cursor-pointer ${
        dragActive 
          ? 'border-brand-primary bg-blue-50/30' 
          : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
      }`}
    >
      <input 
        type="file" 
        id="file-upload-input" 
        className="hidden" 
        onChange={triggerSelect} 
      />
      <label htmlFor="file-upload-input" className="cursor-pointer flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-brand-primary mb-1">
          <Upload className="w-5 h-5" />
        </div>
        {selectedFile ? (
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium text-brand-text-main">{selectedFile.name}</span>
            <span className="text-xs text-brand-text-sub mt-0.5">{selectedFile.size}</span>
            <button 
              type="button" 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedFile(null);
              }}
              className="mt-2 text-xs font-semibold text-brand-danger hover:underline inline-flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Remover arquivo
            </button>
          </div>
        ) : (
          <div>
            <p className="text-sm font-semibold text-brand-text-main">Arraste arquivos ou clique para fazer upload</p>
            <p className="text-xs text-brand-text-sub mt-1">PDF, Documentos, Imagens ou Slides até 10MB</p>
          </div>
        )}
      </label>
    </div>
  );
};

// ==========================================
// AVATAR WITH RINGS
// ==========================================
interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  level?: number;
  role?: 'student' | 'teacher';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  level,
  role = 'student'
}) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
    xl: "w-20 h-20 text-2xl"
  };

  const ringColor = role === 'teacher' ? 'ring-amber-400' : 'ring-brand-primary';

  return (
    <div className="relative inline-block select-none">
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        className={`rounded-full object-cover ring-2 ${ringColor} ring-offset-2 ${sizeClasses[size]}`}
      />
      {level !== undefined && (
        <span className="absolute -bottom-1 -right-1 bg-brand-secondary text-brand-text-main text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white shadow-sm flex items-center justify-center min-w-[18px]">
          Lvl {level}
        </span>
      )}
    </div>
  );
};

// ==========================================
// MODAL SYSTEM
// ==========================================
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-lg w-full overflow-hidden relative z-10"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h3 className="text-lg font-bold text-brand-text-main">{title}</h3>
              <button 
                onClick={onClose}
                className="text-brand-text-sub hover:text-brand-text-main p-1 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ==========================================
// ALERTS & TOASTS
// ==========================================
interface AlertProps {
  type?: 'info' | 'success' | 'error';
  title: string;
  description: string;
}

export const Alert: React.FC<AlertProps> = ({ type = 'info', title, description }) => {
  const styles = {
    info: {
      bg: "bg-blue-50 border-blue-100",
      icon: <Info className="w-5 h-5 text-brand-primary shrink-0" />,
      text: "text-blue-800"
    },
    success: {
      bg: "bg-emerald-50 border-emerald-100",
      icon: <CheckCircle className="w-5 h-5 text-brand-success shrink-0" />,
      text: "text-emerald-800"
    },
    error: {
      bg: "bg-red-50 border-red-100",
      icon: <AlertCircle className="w-5 h-5 text-brand-danger shrink-0" />,
      text: "text-red-800"
    }
  };

  return (
    <div className={`flex gap-3 p-4 border rounded-xl ${styles[type].bg} ${styles[type].text}`}>
      {styles[type].icon}
      <div>
        <h5 className="font-semibold text-sm">{title}</h5>
        <p className="text-xs opacity-90 mt-0.5">{description}</p>
      </div>
    </div>
  );
};

export const Toast: React.FC<{ message: string; visible: boolean; onClose: () => void }> = ({
  message,
  visible,
  onClose
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-sm py-3 px-5 rounded-xl shadow-lg flex items-center gap-3 border border-slate-800"
        >
          <CheckCircle className="w-4 h-4 text-brand-success" />
          <span>{message}</span>
          <button onClick={onClose} className="text-slate-400 hover:text-white ml-2">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ==========================================
// PAGINATION
// ==========================================
export const Pagination: React.FC = () => {
  return (
    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6">
      <span className="text-xs text-brand-text-sub">Mostrando 1-10 de 32 itens</span>
      <div className="flex items-center gap-1.5">
        <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-brand-text-sub disabled:opacity-50" disabled>
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="px-3 py-1 text-xs font-semibold bg-brand-primary text-white border border-brand-primary rounded-lg">1</button>
        <button className="px-3 py-1 text-xs font-medium border border-slate-200 text-brand-text-main rounded-lg hover:bg-slate-50">2</button>
        <button className="px-3 py-1 text-xs font-medium border border-slate-200 text-brand-text-main rounded-lg hover:bg-slate-50">3</button>
        <span className="text-xs text-brand-text-sub px-1">...</span>
        <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-brand-text-sub">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ==========================================
// ICON RESOLVER UTILITY
// ==========================================
export const BadgeIconResolver: React.FC<{ name: string; className?: string }> = ({ name, className = '' }) => {
  switch (name) {
    case 'Brain':
      return <Brain className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'MessageSquare':
      return <MessageSquare className={className} />;
    case 'Atom':
      return <TrendingUp className={className} />; // simple substitute for chemistry look
    case 'Award':
      return <Award className={className} />;
    default:
      return <User className={className} />;
  }
};
