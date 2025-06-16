interface CarouselIndicatorProps {
  total: number
  current: number
  onSelect: (index: number) => void
}

export default function CarouselIndicator({
  total,
  current,
  onSelect,
}: CarouselIndicatorProps) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`w-3 h-3 rounded-full transition ${
            current === index ? 'bg-primary scale-110' : 'bg-gray-400'
          }`}
        />
      ))}
    </div>
  )
}
