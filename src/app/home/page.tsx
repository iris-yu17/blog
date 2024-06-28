export default function Home() {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="mb-4 text-4xl font-light">Welcome to</div>
      <div className="relative overflow-hidden font-press text-5xl">
        <h1 className="block flex-nowrap lg:flex">
          <span className="mb-3 block text-primary lg:mb-0">IRIS&nbsp;</span>
          <span>Studio</span>
        </h1>
        <div className="fill-mode-forwards animate-mobile_typing absolute -top-1 left-0 h-1/2 w-full bg-black-200 transition-none lg:hidden lg:h-full">
          <div className="h-full w-1 animate-flicker bg-primary"></div>
        </div>
        <div className="fill-mode-forwards absolute -top-1 left-0 hidden h-1/2 w-full animate-typing bg-black-200 transition-none lg:block lg:h-full">
          <div className="h-full w-1 animate-flicker bg-primary"></div>
        </div>
      </div>
      <div className="w-full h-0.5 bg-border mt-3"></div>
      <div className="mt-4 text-tertiary">
        <div className="">fontend development</div>
        <div>react</div>
        <div>javascript</div>
        <div>rrasaa</div>
        <div>Lorem ipsum dolor sit</div>
      </div>
    </div>
  );
}
