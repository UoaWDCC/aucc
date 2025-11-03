import Button from '@/components/Button'

export function UsefulLinksCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
      {/* Club Public Library Card */}
      <div className="bg-cream flex min-h-[280px] flex-col justify-between p-6 md:p-8">
        <div className="flex-1">
          <h2 className="text-algae font-heading mb-4 text-lg">
            CLUB PUBLIC LIBRARY
          </h2>
          <p className="font-body text-abyss text-sm leading-relaxed italic">
            The Public Library is an online archive containing things like river
            guides, maps, the constitution, safe operating plans, the gear hire
            policy, AGM meeting minutes, and various archived updates.
          </p>
        </div>
        <div className="mt-6">
          <Button
            intent="primary"
            color="algae"
            size="md"
            className="font-unbounded w-full px-3 text-[10px] md:w-auto"
            href="https://drive.google.com/drive/folders/1Y8VaTakcVwgN3s1UIHdPa5hAHoHplnNc?usp=sharing"
          >
            LIBRARY
          </Button>
        </div>
      </div>

      {/* Member Code of Conduct Card */}
      <div className="bg-cream flex min-h-[280px] flex-col justify-between p-6 md:p-8">
        <div className="flex-1">
          <h2 className="text-algae font-heading mb-4 text-lg">
            MEMBER CODE OF CONDUCT
          </h2>
          <p className="font-body text-abyss text-sm leading-relaxed italic">
            Behaviour which goes against our code will be addressed though
            appropriate interventions, regardless of severity. If you believe
            there has been behaviour which contravenes this Code, please reach
            out and report it though the complaint process.
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <Button
            intent="primary"
            color="algae"
            size="md"
            className="font-unbounded bg-algae text-cream w-full px-3 text-[10px] md:w-auto"
            href="https://drive.google.com/file/d/1Ur494ge6rQmpi8xaB8mhLCVIUnAnZ7ny/view?usp=sharing"
          >
            CODE OF CONDUCT
          </Button>
          <Button
            intent="primary"
            color="algae"
            size="md"
            className="font-unbounded w-full px-3 text-[10px] md:w-auto"
            href="https://docs.google.com/document/d/1t84trqTszPgwpd1IZuQJxJDD-0dBDtM_fIobY3OFmoo/edit?usp=sharing"
          >
            FORMAL COMPLAINT PROCESS
          </Button>
        </div>
      </div>

      {/* Beginner Information Card */}
      <div className="bg-cream flex min-h-[280px] flex-col justify-between p-6 md:p-8">
        <div className="flex-1">
          <h2 className="text-algae font-heading mb-4 text-lg">
            BEGINNER INFORMATION
          </h2>
          <p className="font-body text-abyss text-sm leading-relaxed italic">
            Useful guides if you&#39;re a beginner:
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <Button
            intent="primary"
            color="algae"
            size="md"
            className="font-unbounded bg-algae text-cream w-full px-3 text-[10px] md:w-auto"
            href="https://drive.google.com/file/d/1FEGhK0jm6E7m3nvB3ibz7YjeHhtlX84_/view?usp=sharing"
          >
            HOW TO HAVE A GOOD DAY ON THE RIVER
          </Button>
          <Button
            intent="primary"
            color="algae"
            size="md"
            className="font-unbounded w-full px-3 text-[10px] md:w-auto"
            href="https://drive.google.com/file/d/18SGYIKmnTvichciizlvpp4fwKnaDW8EY/view?usp=sharing"
          >
            POOL TRAINING GUIDES & TECHNIQUES
          </Button>
        </div>
      </div>

      {/* Legal Policy Card */}
      <div className="bg-cream flex min-h-[280px] flex-col justify-between p-6 md:p-8">
        <div className="flex-1">
          <h2 className="text-algae font-heading mb-4 text-lg">LEGAL POLICY</h2>
        </div>
        <div className="mt-6 flex flex-col gap-3 md:flex-row lg:flex-col xl:flex-col">
          <Button
            intent="primary"
            color="algae"
            size="md"
            className="font-unbounded bg-algae text-cream w-full px-3 text-[10px] md:flex-1 lg:w-full xl:w-full"
            href="http://media.wix.com/ugd/b21f02_0d1e26de398145149a3a5abc63976467.pdf"
          >
            AUCC CONSTITUTION
          </Button>
          <Button
            intent="primary"
            color="algae"
            size="md"
            className="font-unbounded w-full px-3 text-[10px] md:flex-1 lg:w-full xl:w-full"
            href="https://www.aucc.org.nz/gearhirepolicy"
          >
            GEAR HIRE POLICY
          </Button>
        </div>
      </div>
    </div>
  )
}
