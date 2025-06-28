export function ScrollCue() {
  return (
    <div className="absolute bottom-13 z-10 md:right-[15vw] md:bottom-[11vw]">
      <div className="text-cream font-handwritten -rotate-21 text-[16px] leading-4 md:translate-y-4.5 md:-rotate-7 lg:translate-y-6 lg:text-[23px]">
        scroll to<br className="block md:hidden"></br> explore!
      </div>
      <div className="relative translate-x-5 rotate-22 md:translate-x-22 md:rotate-0 lg:translate-x-32">
        <svg
          width="37"
          height="47"
          viewBox="0 0 37 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.0593 36C24.2845 38.5984 25.8925 40.9098 26.8149 43.6033C27.4037 45.3224 34.0586 40.9863 35.7648 40.563"
            stroke="#EFEFE1"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M7.30759 1.04585C11.7919 1.95585 17.8629 2.40564 19.1809 7.44101C19.9709 10.4592 20.9278 15.8227 18.8566 18.5112C17.1898 20.6747 13.5316 21.9211 10.6879 21.1997C7.81824 20.4718 11.4984 16.6495 12.4289 16.0652C17.1003 13.1317 24.9629 13.1947 28.2112 18.2664C32.8575 25.521 32.1759 35.8066 27.9435 42.7272"
            stroke="#EFEFE1"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}
