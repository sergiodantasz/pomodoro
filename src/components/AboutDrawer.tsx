import { Drawer } from "vaul";
import { RiInformation2Fill } from "react-icons/ri";

export const AboutDrawer = () => {
  return (
    <Drawer.Root direction="right">
      <Drawer.Trigger className="btn fixed top-5 right-5">
        <RiInformation2Fill size={20} />
        <span className="font-semibold">About</span>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="fixed top-2 right-2 bottom-2 z-10 flex h-fit w-[310px] outline-none"
          style={
            { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
          }
        >
          <div className="flex w-full grow flex-col rounded-[16px] bg-base-100 p-5 text-base-content">
            <div className="mx-auto flex max-w-md flex-col gap-4">
              <Drawer.Title className="text-lg font-bold">
                About this app
              </Drawer.Title>
              <Drawer.Description className="flex flex-col gap-2">
                <span>
                  This app was created to help improve focus, productivity, and
                  time management. It provides a simple and distraction-free way
                  to organize work sessions and breaks, following the{" "}
                  <a
                    className="link"
                    href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pomodoro technique principles
                  </a>
                  .
                </span>
                <span>
                  This project is open source and{" "}
                  <a
                    className="link"
                    href="https://github.com/sergiodantasz/pomodoro"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    available on GitHub
                  </a>
                  . Feel free to fork it and adapt it to your own workflow.
                </span>
              </Drawer.Description>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
