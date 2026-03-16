export function Footer() {
  return (
    <footer className="bg-[#112e51] text-[#7a90b8] py-4 px-5 text-xs text-center">
      <div className="max-w-[620px] mx-auto">
        <p className="mb-2">© 2026 MyFedPensionEdu.com — All Rights Reserved</p>
        <div className="flex justify-center gap-5 mb-3">
          <a href="/privacy" className="text-[#aabbd4] hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="text-[#aabbd4] hover:underline">
            Terms of Use
          </a>
        </div>
        <div className="flex justify-center items-center gap-2 text-[#dce4ef]">
          <span aria-hidden="true">🔒</span>
          <span>
            An independent educational resource for federal employees — not affiliated with any
            government agency
          </span>
        </div>
      </div>
    </footer>
  )
}
