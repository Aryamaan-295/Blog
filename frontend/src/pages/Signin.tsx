import Qoute from '../components/Qoute';
import SigninForm from '../components/SigninForm'

export default function Signup() {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div>
                <SigninForm />
            </div>
            <div className='hidden lg:block'>
                <Qoute />                
            </div>
        </div>
    )
}