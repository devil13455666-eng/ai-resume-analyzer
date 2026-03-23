import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Search, Check, X } from 'lucide-react';
import { DOMAIN_ROLES, JOB_KEYWORDS } from '../lib/resumeAnalyzer';

interface DomainSelectorProps {
  value: string;
  onChange: (role: string) => void;
  onClose?: () => void;
  inline?: boolean;
}

export default function DomainSelector({ value, onChange, onClose, inline = false }: DomainSelectorProps) {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(
    value ? Object.entries(DOMAIN_ROLES).find(([, d]) => d.roles.includes(value))?.[0] ?? null : null
  );
  const [search, setSearch] = useState('');

  const domains = Object.entries(DOMAIN_ROLES);

  // Filter domains/roles by search
  const filteredDomains = search
    ? domains.filter(([domain, data]) =>
        domain.toLowerCase().includes(search.toLowerCase()) ||
        data.roles.some(r => r.toLowerCase().includes(search.toLowerCase()))
      )
    : domains;

  const handleRoleSelect = (role: string) => {
    onChange(role);
    if (onClose) onClose();
  };

  const content = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
            {selectedDomain ? (
              <button
                onClick={() => setSelectedDomain(null)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <ChevronLeft size={20} style={{ color: '#00d4ff' }} />
                <span className="gradient-text">{selectedDomain}</span>
              </button>
            ) : (
              <>Choose Your <span className="gradient-text">Target Role</span></>
            )}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {selectedDomain
              ? 'Select the specific role you are targeting'
              : 'Your resume will be scored based on this role\'s requirements'}
          </p>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setSelectedDomain(null); }}
          placeholder="Search roles (e.g. Web Developer, Data Scientist...)"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
          style={{ background: 'rgba(6,9,26,0.8)', border: '1px solid rgba(30,45,74,0.8)', color: '#e2e8f0' }}
          onFocus={e => { e.target.style.borderColor = 'rgba(0,212,255,0.5)'; }}
          onBlur={e => { e.target.style.borderColor = 'rgba(30,45,74,0.8)'; }}
        />
      </div>

      {/* Current selection badge */}
      {value && !search && (
        <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg"
          style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}>
          <Check size={14} style={{ color: '#00d4ff' }} />
          <span className="text-sm text-slate-300">Currently selected: </span>
          <span className="text-sm font-semibold" style={{ color: '#00d4ff' }}>{value}</span>
          <button
            onClick={() => onChange('')}
            className="ml-auto text-slate-500 hover:text-red-400 transition-colors"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* Search results — flat list of roles */}
          {search ? (
            <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {filteredDomains.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm">No roles found for "{search}"</div>
              ) : (
                <div className="space-y-1">
                  {filteredDomains.flatMap(([domain, data]) =>
                    data.roles
                      .filter(r => r.toLowerCase().includes(search.toLowerCase()) || domain.toLowerCase().includes(search.toLowerCase()))
                      .map(role => (
                        <RoleButton
                          key={role}
                          role={role}
                          domain={domain}
                          color={data.color}
                          icon={data.icon}
                          selected={value === role}
                          onSelect={handleRoleSelect}
                        />
                      ))
                  )}
                </div>
              )}
            </motion.div>
          ) : !selectedDomain ? (
            /* Domain grid */
            <motion.div key="domains" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredDomains.map(([domain, data]) => {
                  const hasSelected = data.roles.includes(value);
                  return (
                    <motion.button
                      key={domain}
                      onClick={() => setSelectedDomain(domain)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 p-4 rounded-xl text-left transition-all group"
                      style={{
                        background: hasSelected
                          ? `${data.color}18`
                          : 'rgba(13,18,48,0.6)',
                        border: `1px solid ${hasSelected ? data.color + '50' : 'rgba(30,45,74,0.6)'}`,
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = data.color + '60'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = hasSelected ? data.color + '50' : 'rgba(30,45,74,0.6)'; }}
                    >
                      <span className="text-2xl flex-shrink-0">{data.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>{domain}</span>
                          {hasSelected && <Check size={12} style={{ color: data.color }} />}
                        </div>
                        <span className="text-xs text-slate-500 truncate block">{data.description}</span>
                        <span className="text-xs mt-1 block" style={{ color: data.color + 'aa' }}>
                          {data.roles.length} roles
                        </span>
                      </div>
                      <ChevronRight size={14} className="text-slate-600 group-hover:text-slate-400 flex-shrink-0" />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* Role list for selected domain */
            <motion.div key="roles" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {(() => {
                const domainData = DOMAIN_ROLES[selectedDomain];
                return (
                  <div className="space-y-2">
                    {domainData.roles.map(role => (
                      <RoleButton
                        key={role}
                        role={role}
                        domain={selectedDomain}
                        color={domainData.color}
                        icon={domainData.icon}
                        selected={value === role}
                        onSelect={handleRoleSelect}
                      />
                    ))}
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  if (inline) {
    return <div className="card-glass p-6">{content}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 8 }}
      transition={{ duration: 0.2 }}
      className="card-glass p-6"
      style={{ maxHeight: '520px', display: 'flex', flexDirection: 'column' }}
    >
      {content}
    </motion.div>
  );
}

function RoleButton({ role, domain, color, icon, selected, onSelect }: {
  role: string; domain: string; color: string; icon: string; selected: boolean; onSelect: (r: string) => void;
}) {
  const count = JOB_KEYWORDS[role]?.length ?? 0;

  return (
    <motion.button
      onClick={() => onSelect(role)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all"
      style={{
        background: selected ? `${color}18` : 'rgba(13,18,48,0.5)',
        border: `1.5px solid ${selected ? color : 'rgba(30,45,74,0.6)'}`,
        boxShadow: selected ? `0 0 12px ${color}25` : 'none',
      }}
    >
      <span className="text-lg flex-shrink-0">{icon}</span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm" style={{ color: selected ? color : '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>
            {role}
          </span>
          {selected && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
              style={{ background: `${color}25`, color }}>
              <Check size={10} /> Selected
            </span>
          )}
        </div>
        <span className="text-xs text-slate-500">{domain} • {count} keywords tracked</span>
      </div>
      <ChevronRight size={14} className="text-slate-600 flex-shrink-0" />
    </motion.button>
  );
}
