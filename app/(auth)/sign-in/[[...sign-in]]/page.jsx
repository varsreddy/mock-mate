// import { SignIn } from '@clerk/nextjs'

// export default function Page() {
//   return <SignIn />
// }


import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <SignIn />
    </div>
  );
}
