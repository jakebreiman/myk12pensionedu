export function Header() {
  return (
    <header>
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
