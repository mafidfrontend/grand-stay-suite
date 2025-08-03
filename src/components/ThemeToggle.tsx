import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ] as const;

  return (
    <div className="dropdown dropdown-end">
      <div 
        tabIndex={0} 
        role="button" 
        className="btn btn-ghost btn-circle bg-base-100/50 backdrop-blur-sm border border-base-300/50 hover:bg-base-200/80 transition-all duration-300 hover:scale-105 shadow-soft"
      >
        <motion.div
          initial={false}
          animate={{ rotate: resolvedTheme === 'dark' ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {resolvedTheme === 'dark' ? (
            <Moon className="h-5 w-5 text-primary" />
          ) : (
            <Sun className="h-5 w-5 text-accent" />
          )}
        </motion.div>
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100/95 backdrop-blur-md rounded-box z-[1] w-36 p-2 shadow-elevated border border-base-300/50">
        {themes.map(({ value, icon: Icon, label }) => (
          <li key={value}>
            <button
              onClick={() => setTheme(value)}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-200 ${
                theme === value 
                  ? 'bg-primary text-primary-content shadow-soft' 
                  : 'hover:bg-base-200/80'
              }`}
            >
              <Icon className={`h-4 w-4 ${theme === value ? 'text-primary-content' : 'text-base-content/70'}`} />
              <span className="font-medium">{label}</span>
              {theme === value && (
                <motion.div
                  layoutId="activeTheme"
                  className="w-2 h-2 bg-primary-content rounded-full ml-auto"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 