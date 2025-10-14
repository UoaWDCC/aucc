import Button from '@/components/Button'

export function UsefulLinksCards() {
  return (
    <div className="flex w-full flex-wrap items-center gap-10">
      <div className="bg-cream flex h-100 w-124 flex-col items-start justify-center px-20">
        <h2 className="text-algae font-heading text-lg">CLUB PUBLIC LIBRARY</h2>
        <p className="font-body text-abyss mt-7 w-87 text-sm italic">
          The Public Library is an online archive containing things like river
          guides, maps, the constitution, safe operating plans, the gear hire
          policy, AGM meeting minutes, and various archived updates.
        </p>
        <Button
          intent="primary"
          color="algae"
          size="md"
          className="font-unbounded mt-4 px-3 text-[10px]"
          href="https://drive.google.com/drive/folders/1Y8VaTakcVwgN3s1UIHdPa5hAHoHplnNc?usp=sharing"
        >
          LIBRARY
        </Button>
      </div>

      <div className="bg-cream flex h-110 w-117 flex-col items-start justify-center px-20">
        <h2 className="text-algae font-heading text-lg">
          MEMBER CODE OF CONDUCT
        </h2>
        <p className="font-body text-abyss mt-7 w-85 text-sm italic">
          Behaviour which goes against our code will be addressed though
          appropriate interventions, regardless of severity. If you believe
          there has been behaviour which contravenes this Code, please reach out
          and report it though the complaint process.
        </p>
        <Button
          intent="primary"
          color="algae"
          size="md"
          className="font-unbounded bg-algae text-cream mt-9 px-3 text-[10px]"
          href="https://drive.google.com/file/d/1Ur494ge6rQmpi8xaB8mhLCVIUnAnZ7ny/view?usp=sharing"
        >
          CODE OF CONDUCT
        </Button>
        <Button
          intent="primary"
          color="algae"
          size="md"
          className="font-unbounded mt-4 px-3 text-[10px]"
          href="https://docs.google.com/document/d/1t84trqTszPgwpd1IZuQJxJDD-0dBDtM_fIobY3OFmoo/edit?usp=sharing"
        >
          FORMAL COMPLAINT PROCESS
        </Button>
      </div>

      <div className="bg-cream flex h-110 w-117 flex-col items-start justify-center px-20">
        <h2 className="text-algae font-heading text-lg">
          BEGINNER INFORMATION
        </h2>
        <p className="font-body text-abyss mt-7 w-85 text-sm italic">
          Useful guides if you&#39;re a beginner:
        </p>
        <Button
          intent="primary"
          color="algae"
          size="md"
          className="font-unbounded bg-algae text-cream mt-9 px-3 text-[10px]"
          href="https://drive.google.com/file/d/1FEGhK0jm6E7m3nvB3ibz7YjeHhtlX84_/view?usp=sharing"
        >
          HOW TO HAVE A GOOD DAY ON THE RIVER
        </Button>
        <Button
          intent="primary"
          color="algae"
          size="md"
          className="font-unbounded mt-4 px-3 text-[10px]"
          href="https://drive.google.com/file/d/18SGYIKmnTvichciizlvpp4fwKnaDW8EY/view?usp=sharing"
        >
          POOL TRAINING GUIDES & TECHNIQUES
        </Button>
      </div>

      <div className="bg-cream flex h-40 w-120 flex-col items-center justify-center px-20">
        <h2 className="text-algae font-heading text-lg">LEGAL POLICY</h2>
        <div className="mt-5 flex gap-3">
          <Button
            intent="primary"
            color="algae"
            size="md"
            className="font-unbounded bg-algae text-cream h-8 px-3 text-[10px]"
            href="http://media.wix.com/ugd/b21f02_0d1e26de398145149a3a5abc63976467.pdf"
          >
            AUCC CONSTITUTION
          </Button>
          <Button
            intent="primary"
            color="algae"
            size="md"
            className="font-unbounded h-8 px-3 text-[10px]"
            href="https://www.aucc.org.nz/gearhirepolicy"
          >
            GEAR HIRE POLICY
          </Button>
        </div>
      </div>
    </div>
  )
}
