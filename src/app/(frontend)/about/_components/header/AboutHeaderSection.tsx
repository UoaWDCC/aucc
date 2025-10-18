import { HeaderBackground } from './HeaderBackground'

export function AboutHeaderSection() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-start align-middle">
      <HeaderBackground />
      <div className="absolute flex h-full w-full flex-col items-center justify-start">
        <div className="mt-[11vw] flex w-fit flex-col items-center justify-center">
          <div className="font-heading text-cream text-center text-[140px] tracking-tighter">
            ABOUT US
          </div>

          <div className="text-cream mt-4 -translate-y-18 self-start text-left text-[16px] font-normal tracking-normal italic">
            Learn about us, methods to contact us, <br />
            and the faces behind our team!
          </div>
        </div>
      </div>
    </div>
  )
}
