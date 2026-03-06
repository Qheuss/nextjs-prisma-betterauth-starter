interface SignUpProps {
  handleSubmitSignup: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SignUp({ handleSubmitSignup }: SignUpProps) {
  return (
    <>
      <h1 className='text-2xl font-bold'>Sign Up</h1>
      <form onSubmit={handleSubmitSignup} className='space-y-4'>
        <input
          name='name'
          placeholder='Full Name'
          required
          className='w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2'
        />
        <input
          name='email'
          type='email'
          placeholder='Email'
          required
          className='w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2'
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          minLength={8}
          className='w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2'
        />
        <button
          type='submit'
          className='w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200'
        >
          Create Account
        </button>
      </form>
    </>
  );
}
