export default function Loader({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center w-full py-12">
      <div
        className="rounded-full border-2 border-white/20 border-t-white animate-spin"
        style={{ width: size, height: size }}
      />
    </div>
  )
}
