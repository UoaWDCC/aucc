import { HeaderBackground } from './HeaderBackground'

// Below xl the title scales with the screen and the text is centred.
// From xl up the original desktop layout applies.
export function AboutHeaderSection() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-start overflow-hidden align-middle">
      <HeaderBackground />
      <div className="absolute flex h-full w-full flex-col items-center justify-start">
        <div className="mt-32 flex w-fit flex-col items-center justify-center px-6 xl:mt-[11vw] xl:px-0">
          <h1 className="font-heading text-cream text-center text-[min(17vw,140px)] leading-none tracking-tighter xl:text-[140px] xl:leading-normal">
            ABOUT US
          </h1>

          <p className="text-cream mt-6 text-center text-[16px] font-normal tracking-normal italic xl:mt-4 xl:-translate-y-18 xl:self-start xl:text-left">
            Learn about us, methods to contact us,{' '}
            <br className="hidden xl:inline" />
            and the faces behind our team!
          </p>
        </div>
      </div>
    </div>
  )
}
