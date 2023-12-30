import React from 'react'

function Footer() {
    return (
        <footer className='w-full bg-purple-800 '>
            <div className='flex flex-col gap-3 items-center py-7'>
                <h3 className='text-purple-50'>
                    Todos os direitos reservados &copy; 2023
                </h3>
                <p className='text-purple-300 underline text-sm'>
                    <a href='https://github.com/guibleone'> Desenvolvido por Guilherme Leone</a>
                </p>
            </div>
        </footer>
    )
}

export default Footer