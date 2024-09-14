import Qoute from '../components/Qoute';
import SignupForm from '../components/SignupForm'

export default function Signup() {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div>
                <SignupForm />
            </div>
            <div className='hidden lg:block'>
                <Qoute />                
            </div>
        </div>
    )
}