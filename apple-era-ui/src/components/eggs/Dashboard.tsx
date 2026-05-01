"use client";
import { useState } from 'react';

interface WidgetProps {
  id: string;
  title: string;
  position: { x: number; y: number };
  children: React.ReactNode;
  onDrag: (id: string, position: { x: number; y: number }) => void;
}

const Widget = ({ id, title, position, children, onDrag }: WidgetProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      onDrag(id, {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global mouse event listeners when dragging
  if (isDragging) {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  return (
    <div
      className="absolute bg-[var(--surface)] backdrop-blur-[var(--blur)] border border-[var(--card-border)] rounded-ui shadow-card cursor-move"
      style={{
        left: position.x,
        top: position.y,
        width: '200px',
        minHeight: '150px'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="p-3 border-b border-[var(--card-border)] bg-[var(--chrome)]">
        <h3 className="font-ui text-sm font-semibold text-[var(--fg)]">{title}</h3>
      </div>
      <div className="p-3">
        {children}
      </div>
    </div>
  );
};

export default function Dashboard({ onClose }: { onClose: () => void }) {
  const [widgets, setWidgets] = useState([
    {
      id: 'clock',
      title: 'Clock',
      position: { x: 100, y: 100 },
      content: (
        <div className="text-center">
          <div className="text-2xl font-mono text-[var(--fg)]">
            {new Date().toLocaleTimeString()}
          </div>
          <div className="text-sm text-[var(--muted)] font-ui">
            {new Date().toLocaleDateString()}
          </div>
        </div>
      )
    },
    {
      id: 'weather',
      title: 'Weather',
      position: { x: 350, y: 150 },
      content: (
        <div className="text-center">
          <div className="text-4xl mb-2">🌤</div>
          <div className="text-lg font-ui text-[var(--fg)]">72°F</div>
          <div className="text-sm text-[var(--muted)] font-ui">Partly Cloudy</div>
          <div className="text-xs text-[var(--muted)] font-ui">Cupertino, CA</div>
        </div>
      )
    },
    {
      id: 'sticky',
      title: 'Stickies',
      position: { x: 200, y: 300 },
      content: (
        <div className="bg-yellow-200 p-2 rounded text-black text-sm font-ui min-h-[80px]">
          <div>Remember to:</div>
                     <div>• Switch themes with &quot;t&quot;</div>
           <div>• Try typing &quot;moof&quot;</div>
          <div>• Press Alt+B for beachball</div>
          <div className="text-xs mt-2 opacity-70">- Dashboard Widget</div>
        </div>
      )
    }
  ]);

  const handleWidgetDrag = (id: string, position: { x: number; y: number }) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === id ? { ...widget, position } : widget
    ));
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Cork board texture */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #8B4513 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #8B4513 1px, transparent 1px),
            linear-gradient(45deg, transparent 10px, rgba(139,69,19,0.1) 10px, rgba(139,69,19,0.1) 12px, transparent 12px)
          `,
          backgroundSize: '50px 50px, 50px 50px, 25px 25px'
        }}
      />

      {/* Widgets */}
      {widgets.map(widget => (
        <Widget
          key={widget.id}
          id={widget.id}
          title={widget.title}
          position={widget.position}
          onDrag={handleWidgetDrag}
        >
          {widget.content}
        </Widget>
      ))}

      {/* Dashboard controls */}
      <div className="absolute top-4 right-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-[var(--btn-bg)] text-[var(--btn-fg)] border border-[var(--btn-border)] rounded-ui shadow-btn font-ui text-sm transition hover:scale-[0.98]"
        >
          Exit Dashboard
        </button>
      </div>

      {/* Dashboard info */}
      <div className="absolute bottom-4 left-4 text-white/70 text-sm font-ui">
        <p>Drag widgets to rearrange</p>
                 <p className="text-xs opacity-60">Press F12 or type &quot;dashboard&quot; to toggle</p>
      </div>
    </div>
  );
} 