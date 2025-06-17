import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>404 - Sahifa topilmadi</h1>
      <p>Siz izlagan sahifa mavjud emas.</p>
      <Link href="/" style={{ color: "blue", textDecoration: "underline", marginTop: "20px", display: "inline-block" }}>
        Bosh sahifaga qaytish
      </Link>
    </div>
  )
}
