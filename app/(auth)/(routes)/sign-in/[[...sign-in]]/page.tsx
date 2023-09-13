import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          // eslint-disable-next-line prettier/prettier
          form: `before:content-['_Demo_login:_demo@demo.com_________password:_demo'] before:whitespace-pre-wrap before:h-10 before:w-full before:text-xs before:text-black before:leading-relaxed before:block`
        }
      }}
    />
  );
}
