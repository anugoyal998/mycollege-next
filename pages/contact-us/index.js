import Image from 'next/image'
import contact from '../../img/contact.png'

const index = () => {
    return (
        <>
           <div className='w-screen h-screen'>
               <h1 className='w-full text-center p-2 mt-6 sm:text-2xl text-lg font-bold mb-10 '>USE THE FORM BELOW TO DROP US AN E-MAIL !</h1>
         
               {/* form-- */}
               <div className='w-screen flex justify-center items-center h-[60%]  flex-wrap'>
               <div className='w-full sm:w-[30%]  text-center'>
               <Image src={contact} width={200} height={200}/>
               </div>
                  
                   <form className='w-full sm:w-[50%] shadow-lg  p-8'>

                   <div className='flex flex-wrap w-full '>
                   <input type='text' name='firstName' placeholder='First Name' className='outline-none border-2 border-black flex-1   text-sm p-3 m-1'/>
                   <input type='text' name='lastName' placeholder='Last Name' className='outline-none border-2 border-black flex-1  text-sm p-3 m-1'/>
                   </div>
                  
                   <div className='flex flex-wrap w-full '>
                   <input type='email' name='email' placeholder='Email' className='outline-none border-2 border-black flex-1  text-sm p-3 m-1'/>
                   <input type='text' name='phoneNumber' placeholder='Phone Number' className='outline-none border-2 border-black flex-1  text-sm p-3 m-1'/>
                   </div>

                   <div className='flex w-full '>
                   <textarea type='text' name='query' placeholder='What can we do for you ?' className='outline-none border-2 border-black flex-1   text-sm p-3 m-1'></textarea>
                   </div>

                   <button  className='bg-cl1 hover:bg-cl2 animation text-white font-semibold p-3 w-24 h-12 rounded-md mt-3 text-lg ml-1'>
                       SEND IT
                   </button>
                   </form>
               </div>

           </div>
        </>
    )
}

export default index
