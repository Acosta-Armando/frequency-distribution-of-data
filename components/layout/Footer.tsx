import Image from 'next/image'
import Link from 'next/link'
import fbLogo from '/public/icons/facebook.svg'
import igLogo from '/public/icons/instagram.svg'
import inLogo from '/public/icons/linkedin.svg'

export const rrss = [
  {
    title: 'LinkedIn',
    logo: inLogo,
    url: 'https://www.linkedin.com/in/armandkun95',
  },
  {
    title: 'Facebook',
    logo: fbLogo,
    url: 'https://www.facebook.com/armajosira/',
  },
  {
    title: 'Instagram',
    logo: igLogo,
    url: 'https://www.instagram.com/armajosira/?hl=es-la',
  },
]

const Footer = () => {
  return (
    <footer
      translate='no'
      className={`flex flex-col gap-5 my-5 text-gray-500 font-semibold`}
    >
      <div className='flex flex-row gap-5 lg:gap-8 w-full items-center justify-center'>
        {rrss.map((item, idx) => (
          <Link
            key={idx}
            href={item.url}
            target='_blank'
            className='size-6 lg:size-8 hover:opacity-70'
          >
            <Image src={item.logo} alt={''} className='size-6 lg:size-10' />
          </Link>
        ))}
      </div>

      <div>
        <p className='text-center'>&copy; Armando Acosta.</p>
        <p className='text-center'>All rights reservered.</p>
      </div>
    </footer>
  )
}

export default Footer
