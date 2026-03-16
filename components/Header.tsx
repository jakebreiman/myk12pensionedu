export function Header() {
  return (
    <header>
      {/* Top disclaimer banner */}
      <div className="bg-[#112e51] text-[#dce4ef] px-5 py-1.5 text-xs flex items-center gap-2 leading-relaxed">
        <span aria-hidden="true">🔒</span>
        <span>
          An independent educational resource for federal employees — not affiliated with any
          government agency
        </span>
      </div>

      {/* Logo block */}
      <div className="bg-white px-5 py-4 border-b-4 border-[#205493]">
        <div className="max-w-[620px] mx-auto">
          <div className="text-[#112e51] font-bold text-lg tracking-tight">
            MyFedPensionEdu
            <span className="font-normal text-gray-500">.com</span>
          </div>
          <div className="text-gray-500 text-xs mt-1">
            Federal Retirement Education &amp; Appointment Scheduling
          </div>
        </div>
      </div>
    </header>
  )
}
