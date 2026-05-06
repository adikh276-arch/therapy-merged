import React, { useEffect, useRef, useState, useCallback, MutableRefObject } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fabric } from 'fabric';

const PROMPTS = [
  {
    quote: "What does the sky look like in your safe place? Draw its colour, light, or feeling.",
    button: "I've added the sky →",
    hint: "There's no right way — any mark is enough.",
  },
  {
    quote: "What does the ground feel like? Grass, sand, water, a wooden floor? Add it below the sky.",
    button: "I've added the ground →",
    hint: "Think about what your feet feel in this place.",
  },
  {
    quote: "Add one thing that belongs here — a tree, a chair, a window, a pet, a lamp. Anything that feels right.",
    button: "I've added something →",
    hint: "It doesn't have to look perfect. It just has to feel true.",
  },
  {
    quote: "What brings warmth or comfort to this place? A light, a fire, sunlight, a blanket? Add it wherever it feels right.",
    button: "I've added the warmth →",
    hint: "Even a small dot of colour counts.",
  },
  {
    quote: "Finally — add 3 to 5 words that belong here. Tap your drawing to place them anywhere.",
    button: "These are my words →",
    hint: "",
  },
];

const COLORS = [
  '#CBE4F7', '#FAC775', '#97C459', '#7A5C38', '#ED93B1',
  '#F9A234', '#9FE1CB', '#2C2C2A', '#FFFFFF', '#D4A574', '#E74C3C',
];

const WORD_CHIPS = ['Peace', 'Home', 'Heaven', 'Calm', 'Warm', 'Enough', 'Gentle', 'Safe'];

type Tool = 'brush' | 'shape' | 'text';

interface Props {
  promptIndex: number;
  canvasRef: MutableRefObject<fabric.Canvas | null>;
  onNext: () => void;
  onFinish: () => void;
}

const CanvasScreen: React.FC<Props> = ({ promptIndex, canvasRef, onNext, onFinish }) => {
  const canvasElRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<Tool>('brush');
  const [color, setColor] = useState('#2C2C2A');
  const [brushSize, setBrushSize] = useState(8);
  const [isEraser, setIsEraser] = useState(false);
  const undoStackRef = useRef<string[]>([]);
  const isInitializedRef = useRef(false);
  const [placedChips, setPlacedChips] = useState<Set<string>>(new Set());
  const [customWord, setCustomWord] = useState('');
  const colorInputRef = useRef<HTMLInputElement>(null);

  // Initialize canvas once
  useEffect(() => {
    if (isInitializedRef.current || !canvasElRef.current) return;
    
    const canvas = new fabric.Canvas(canvasElRef.current, {
      width: 372,
      height: 320,
      backgroundColor: '#FDFAF6',
      isDrawingMode: true,
    });
    
    canvasRef.current = canvas;
    isInitializedRef.current = true;

    canvas.on('object:added', () => {
      const json = JSON.stringify(canvas.toJSON());
      if (undoStackRef.current.length >= 20) undoStackRef.current.shift();
      undoStackRef.current.push(json);
    });

    return () => {};
  }, [canvasRef]);

  // Update tool settings
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (tool === 'brush') {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.color = isEraser ? '#FDFAF6' : color;
      canvas.freeDrawingBrush.width = isEraser ? Math.max(brushSize, 20) : brushSize;
    } else {
      canvas.isDrawingMode = false;
    }
  }, [tool, color, brushSize, isEraser, canvasRef]);

  // Handle shape tool clicks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || tool !== 'shape') return;

    const handler = (opt: fabric.IEvent<MouseEvent>) => {
      const pointer = canvas.getPointer(opt.e);
      const rect = new fabric.Rect({
        left: pointer.x - 30,
        top: pointer.y - 20,
        width: 60,
        height: 40,
        fill: 'transparent',
        stroke: color,
        strokeWidth: 2,
      });
      canvas.add(rect);
      canvas.setActiveObject(rect);
    };

    canvas.on('mouse:down', handler);
    return () => { canvas.off('mouse:down', handler); };
  }, [tool, color, canvasRef]);

  // Handle text tool clicks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || tool !== 'text') return;

    const handler = (opt: fabric.IEvent<MouseEvent>) => {
      if ((opt.target as any)) return;
      const pointer = canvas.getPointer(opt.e);
      const text = new fabric.IText('Type here', {
        left: pointer.x,
        top: pointer.y,
        fontFamily: 'Lora',
        fontStyle: 'italic',
        fontSize: 16,
        fill: '#2C2C2A',
      });
      canvas.add(text);
      canvas.setActiveObject(text);
      text.enterEditing();
    };

    canvas.on('mouse:down', handler);
    return () => { canvas.off('mouse:down', handler); };
  }, [tool, canvasRef]);

  // Auto-select text tool on prompt 5
  useEffect(() => {
    if (promptIndex === 4) setTool('text');
  }, [promptIndex]);

  const handleUndo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || undoStackRef.current.length < 2) return;
    undoStackRef.current.pop();
    const prev = undoStackRef.current[undoStackRef.current.length - 1];
    if (prev) {
      canvas.loadFromJSON(JSON.parse(prev), () => canvas.renderAll());
    }
  }, [canvasRef]);

  const placeWord = useCallback((word: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const text = new fabric.IText(word, {
      left: 186 - word.length * 4,
      top: 160,
      fontFamily: 'Lora',
      fontStyle: 'italic',
      fontSize: 16,
      fill: '#2C2C2A',
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    setPlacedChips(prev => new Set(prev).add(word));
  }, [canvasRef]);

  const prompt = PROMPTS[promptIndex];
  const isLast = promptIndex === 4;

  return (
    <div className="flex flex-col" style={{ minHeight: 600 }}>
      {/* Toolbar Row 1: Tools + Eraser + Undo */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{
          backgroundColor: '#F8F5F0',
          borderBottom: '0.5px solid #E9E7E0',
          borderRadius: '14px 14px 0 0',
        }}
      >
        {/* Left: Tools */}
        <div className="flex gap-1">
          {(['brush', 'shape', 'text'] as Tool[]).map(t => (
            <button
              key={t}
              onClick={() => { setTool(t); setIsEraser(false); }}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors"
              style={{
                backgroundColor: tool === t && !isEraser ? '#EAF3DE' : 'transparent',
                border: tool === t && !isEraser ? '1px solid #9FE1CB' : '1px solid transparent',
              }}
            >
              {t === 'brush' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2C2C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
                </svg>
              )}
              {t === 'shape' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2C2A" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                </svg>
              )}
              {t === 'text' && <span className="font-lora italic text-sm" style={{ color: '#2C2C2A' }}>A</span>}
            </button>
          ))}
        </div>

        {/* Center: Brush size */}
        <div className="flex items-center gap-1.5">
          <input
            type="range"
            min={2}
            max={30}
            value={brushSize}
            onChange={e => setBrushSize(Number(e.target.value))}
            className="w-14 h-1 accent-[#5DCAA5]"
          />
          <div
            className="rounded-full flex-shrink-0"
            style={{
              width: Math.min(brushSize, 16),
              height: Math.min(brushSize, 16),
              backgroundColor: isEraser ? '#FDFAF6' : color,
              border: '1px solid #D3D1C7',
            }}
          />
        </div>

        {/* Right: Eraser + Undo */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setIsEraser(!isEraser); setTool('brush'); }}
            className="w-8 h-8 flex items-center justify-center rounded-lg"
            style={{
              backgroundColor: isEraser ? '#EAF3DE' : 'transparent',
              border: isEraser ? '1px solid #9FE1CB' : '1px solid transparent',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2C2A" strokeWidth="2" strokeLinecap="round">
              <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/>
              <path d="M22 21H7"/>
              <path d="m5 11 9 9"/>
            </svg>
          </button>
          <button onClick={handleUndo} className="w-8 h-8 flex items-center justify-center rounded-lg text-sm" style={{ color: '#888780' }}>
            ↩
          </button>
        </div>
      </div>

      {/* Toolbar Row 2: Colors */}
      <div
        className="flex items-center justify-center gap-1.5 px-3 py-1.5"
        style={{
          backgroundColor: '#F8F5F0',
          borderBottom: '0.5px solid #E9E7E0',
        }}
      >
        {/* Color picker */}
        <button
          onClick={() => colorInputRef.current?.click()}
          className="w-5 h-5 rounded-full flex-shrink-0 cursor-pointer relative overflow-hidden"
          style={{ border: '2px solid #D3D1C7' }}
        >
          <div className="w-full h-full rounded-full" style={{ backgroundColor: color }} />
          <input
            ref={colorInputRef}
            type="color"
            value={color}
            onChange={e => { setColor(e.target.value); setIsEraser(false); }}
            className="sr-only"
            tabIndex={-1}
          />
        </button>

        {COLORS.map(c => (
          <button
            key={c}
            onClick={() => { setColor(c); setIsEraser(false); }}
            className="w-5 h-5 rounded-full flex-shrink-0 transition-all"
            style={{
              backgroundColor: c,
              border: color === c && !isEraser ? '2px solid #5DCAA5' : '2px solid transparent',
              boxShadow: c === '#FFFFFF' ? 'inset 0 0 0 0.5px #D3D1C7' : undefined,
            }}
          />
        ))}
      </div>

      {/* Canvas */}
      <div
        className="canvas-wrapper mx-auto"
        style={{
          border: '0.5px solid #E9E7E0',
          borderTop: 'none',
          borderRadius: '0 0 14px 14px',
          overflow: 'hidden',
          width: 372,
          height: 320,
        }}
      >
        <canvas ref={canvasElRef} />
      </div>

      {/* Prompt Card */}
      <div
        className="mt-auto px-4 pt-3.5 pb-5"
        style={{ background: '#fff', borderTop: '0.5px solid #E9E7E0' }}
      >
        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mb-3">
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-colors duration-300"
              style={{ backgroundColor: i <= promptIndex ? '#5DCAA5' : '#E9E7E0' }}
            />
          ))}
        </div>

        {/* Prompt text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={promptIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="font-lora italic text-sm leading-relaxed text-center p-3 rounded-[10px] mb-3"
              style={{ backgroundColor: '#EAF3DE', color: '#3B6D11' }}
            >
              {prompt.quote}
            </div>

            {/* Word chips for prompt 5 */}
            {promptIndex === 4 && (
              <div className="flex flex-wrap justify-center gap-2 mb-3">
                {WORD_CHIPS.map(w => (
                  <button
                    key={w}
                    onClick={() => placeWord(w)}
                    className="font-inter text-xs px-3 py-1.5 rounded-full transition-all"
                    style={{
                      backgroundColor: placedChips.has(w) ? '#EAF3DE' : '#fff',
                      border: `0.5px solid ${placedChips.has(w) ? '#9FE1CB' : '#D3D1C7'}`,
                      color: placedChips.has(w) ? '#3B6D11' : '#5F5E5A',
                    }}
                  >
                    {w}
                  </button>
                ))}
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={customWord}
                    onChange={e => setCustomWord(e.target.value)}
                    placeholder="+ your own"
                    className="font-inter text-xs px-3 py-1.5 rounded-full w-24 outline-none"
                    style={{ border: '0.5px solid #D3D1C7' }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && customWord.trim()) {
                        placeWord(customWord.trim());
                        setCustomWord('');
                      }
                    }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={isLast ? onFinish : onNext}
              className="w-full py-3 rounded-xl font-inter font-medium text-sm transition-all duration-300 hover:opacity-90 mb-2"
              style={{ backgroundColor: '#5DCAA5', color: '#04342C' }}
            >
              {prompt.button}
            </button>

            {prompt.hint && (
              <p className="font-inter text-xs text-center" style={{ color: '#B4B2A9' }}>
                {prompt.hint}
              </p>
            )}

            <button
              onClick={isLast ? onFinish : onNext}
              className="w-full text-center font-inter text-xs mt-1 hover:underline transition-colors"
              style={{ color: '#B4B2A9' }}
            >
              skip this prompt
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CanvasScreen;
