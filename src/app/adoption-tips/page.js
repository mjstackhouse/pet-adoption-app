import Image from 'next/image';
import adoptionImg from '../../../public/adoption-img-1.jpg';
import { Bree_Serif } from 'next/font/google';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function AdoptionTipsPage() {
  return (
    <div className='max-w-[900px] mb-8'>
      <div className='text-left mx-4 sm:mx-0 mb-4 sm:mb-8'>
        <div className='bg-blue bg-gradient-to-r from-blue to-darker-blue px-4 py-2 sm:py-4'>
          <h1 className={`${bree.className} basis-full font-bold text-3xl sm:text-5xl leading-snug sm:leading-tight tracking-wide sm:mb-2`}>
            Tips for First-Time Animal Adopters:
          </h1>
          <h2 className='font-bold text-base sm:text-2xl leading-relaxed tracking-wide'>
            Welcoming a Furry Friend into Your Home
          </h2>
        </div>
        <div className='bg-white rounded-b-3xl px-4 sm:px-8 py-4 sm:py-8'>
          <Image src={adoptionImg} className='object-cover relative mb-4 sm:mb-8' />
          <div className='bg-white'>
            <p className='mb-4'>
              Adopting an animal can be a deeply rewarding experience, bringing joy, companionship, and unconditional love into your life. However, being a responsible pet owner comes with its fair share of challenges and responsibilities. Whether you&#39;re adopting a dog, cat, rabbit, or any other animal, here are some valuable tips and advice to help you create a loving and nurturing environment for your new furry family member.
            </p>
            <ol type='1'>
              <li className='mb-4'>
                <p className='font-bold tracking-wide'>Research and Choose the Right Pet:</p>
                <p>Take the time to research different animal breeds or species to find one that matches your lifestyle, living situation, and personal preferences. Each animal has its unique needs, temperament, and energy levels. Consider factors like size, exercise requirements, grooming needs, and potential health issues before making a decision.</p>
              </li>
              <li className='mb-4'>
                <p className='font-bold tracking-wide'>Prepare Your Home:</p>
                <p>Before bringing your new pet home, ensure that your living space is safe and pet-friendly. Remove any toxic plants, secure loose wires, and create designated spaces for feeding, sleeping, and playing.</p>
              </li>
              <li className='mb-4'>
                <p className='font-bold tracking-wide'>Commitment and Time:</p>
                <p>Owning a pet is a long-term commitment, sometimes spanning over a decade or more. Be prepared to invest time, effort, and love into your pet&#39;s well-being, including daily exercise, playtime, training, and regular vet check-ups.</p>
              </li>
              <li className='mb-4'>
                <p className='font-bold tracking-wide'>Patience and Understanding:</p>
                <p>Your newly adopted pet might need time to adjust to their new environment. They may exhibit signs of stress, fear, or shyness initially. Be patient and give them the space they need to acclimate to their new surroundings.</p>
              </li>
              <li className='mb-4'>
                <p className='font-bold tracking-wide'>Socialization and Training:</p>
                <p>Early socialization and proper training are crucial for a well-adjusted and well-behaved pet. Socialize your animal with other pets, people, and different environments to help them feel more comfortable and confident in various situations.</p>
              </li>
              <li className='mb-4'>
                <p className='font-bold tracking-wide'>Nutrition and Health:</p>
                <p>Provide a balanced and appropriate diet for your pet&#39;s age, size, and specific dietary needs. Regular visits to the veterinarian are essential to keep them healthy and up-to-date on vaccinations, parasite control, and preventive care.</p>
              </li>
              <li className='mb-4'>
                <p className='font-bold tracking-wide'>Bonding and Affection:</p>
                <p>Spend quality time with your pet, engaging in activities they enjoy. Offer love, attention, and affection to build a strong bond and mutual trust.</p>
              </li>
              <li className='mb-4'>
                <p className='font-bold tracking-wide'>Establish Routines:</p>
                <p>Animals thrive on routines, as they provide a sense of stability and security. Create a consistent daily schedule for feeding, playtime, walks, and rest, which will help your pet feel secure and content.</p>
              </li>
              <li className='mb-4'>
                <p className='font-bold tracking-wide'>Pet-Proof Your Home:</p>
                <p>Just like young children, pets can be curious and get into mischief. Secure cabinets, trash cans, and potentially dangerous objects to avoid accidents or ingesting harmful items.</p>
              </li>
              <li className='mb-4'>
                <p className='font-bold tracking-wide'>Be Financially Prepared:</p>
                <p>Pet ownership comes with expenses like food, grooming, toys, medical care, and unexpected emergencies. Ensure you have a budget in place to meet your pet&#39;s needs throughout their lifetime.</p>
              </li>
              <li className='mb-4'>
                <p className='font-bold tracking-wide'>Spaying/Neutering:</p>
                <p>If your pet is not already spayed or neutered, consider doing so to prevent health issues and reduce overpopulation.</p>
              </li>
              <li className='mb-4'>
                <p className='font-bold tracking-wide'>Adoption Considerations:</p>
                <p>Adopt from a reputable shelter or rescue organization. They can provide valuable information about the pet&#39;s background, behavior, and health status.</p>
              </li>
              <li className='mb-4'>
                <p className='font-bold tracking-wide'>Be Mindful of Allergies:</p>
                <p>Make sure that no one in your household is allergic to the type of animal you plan to adopt.</p>
              </li>
              <li className='mb-4'>
                <p className='font-bold tracking-wide'>Stay Positive and Be Flexible:</p>
                <p>Building a strong bond with your new pet may take time, but staying positive and being flexible in your approach will help make the transition smoother for both of you.</p>
              </li>
              <li className='mb-4'>
                <p className='font-bold tracking-wide'>Enjoy the Journey:</p>
                <p>Embrace the joy and love that comes with pet ownership. Cherish the unforgettable moments and memories you&#39;ll create with your new companion.</p>
              </li>
            </ol>
            <p>
            By following these tips and guidelines, you can ensure a happy and fulfilling life for your newly adopted pet and make your journey as a first-time pet owner a remarkable and heartwarming experience. Remember, the love and devotion you invest in your furry friend will be returned to you tenfold. Happy adopting!
            </p>
          </div>
        </div>
      </div>
      {/* <div className='w-full flex px-4 sm:px-0'>
        <Image src={adoptionImg} className='relative mx-auto w-auto rounded-3xl z-10 border-pink border-2 mb-4 sm:mb-8' />
      </div> */}
      {/* <div className='bg-white px-4 py-2'>
        <p className='mb-4'>
        Adopting an animal can be a deeply rewarding experience, bringing joy, companionship, and unconditional love into your life. However, being a responsible pet owner comes with its fair share of challenges and responsibilities. Whether you're adopting a dog, cat, rabbit, or any other animal, here are some valuable tips and advice to help you create a loving and nurturing environment for your new furry family member.
        </p>
        <ol type='1'>
          <li className='mb-4'>
            <p className='font-bold tracking-wide'>Research and Choose the Right Pet:</p>
            <p>Take the time to research different animal breeds or species to find one that matches your lifestyle, living situation, and personal preferences. Each animal has its unique needs, temperament, and energy levels. Consider factors like size, exercise requirements, grooming needs, and potential health issues before making a decision.</p>
          </li>
          <li className='mb-4'>
            <p className='font-bold tracking-wide'>Prepare Your Home:</p>
            <p>Before bringing your new pet home, ensure that your living space is safe and pet-friendly. Remove any toxic plants, secure loose wires, and create designated spaces for feeding, sleeping, and playing.</p>
          </li>
          <li className='mb-4'>
            <p className='font-bold tracking-wide'>Commitment and Time:</p>
            <p>Owning a pet is a long-term commitment, sometimes spanning over a decade or more. Be prepared to invest time, effort, and love into your pet's well-being, including daily exercise, playtime, training, and regular vet check-ups.</p>
          </li>
          <li className='mb-4'>
            <p className='font-bold tracking-wide'>Patience and Understanding:</p>
            <p>Your newly adopted pet might need time to adjust to their new environment. They may exhibit signs of stress, fear, or shyness initially. Be patient and give them the space they need to acclimate to their new surroundings.</p>
          </li>
          <li className='mb-4'>
            <p className='font-bold tracking-wide'>Socialization and Training:</p>
            <p>Early socialization and proper training are crucial for a well-adjusted and well-behaved pet. Socialize your animal with other pets, people, and different environments to help them feel more comfortable and confident in various situations.</p>
          </li>
          <li className='mb-4'>
            <p className='font-bold tracking-wide'>Nutrition and Health:</p>
            <p>Provide a balanced and appropriate diet for your pet's age, size, and specific dietary needs. Regular visits to the veterinarian are essential to keep them healthy and up-to-date on vaccinations, parasite control, and preventive care.</p>
          </li>
          <li className='mb-4'>
            <p className='font-bold tracking-wide'>Bonding and Affection:</p>
            <p>Spend quality time with your pet, engaging in activities they enjoy. Offer love, attention, and affection to build a strong bond and mutual trust.</p>
          </li>
          <li className='mb-4'>
            <p className='font-bold tracking-wide'>Establish Routines:</p>
            <p>Animals thrive on routines, as they provide a sense of stability and security. Create a consistent daily schedule for feeding, playtime, walks, and rest, which will help your pet feel secure and content.</p>
          </li>
          <li className='mb-4'>
            <p className='font-bold tracking-wide'>Pet-Proof Your Home:</p>
            <p>Just like young children, pets can be curious and get into mischief. Secure cabinets, trash cans, and potentially dangerous objects to avoid accidents or ingesting harmful items.</p>
          </li>
          <li className='mb-4'>
            <p className='font-bold tracking-wide'>Be Financially Prepared:</p>
            <p>Pet ownership comes with expenses like food, grooming, toys, medical care, and unexpected emergencies. Ensure you have a budget in place to meet your pet's needs throughout their lifetime.</p>
          </li>
          <li className='mb-4'>
            <p className='font-bold tracking-wide'>Spaying/Neutering:</p>
            <p>If your pet is not already spayed or neutered, consider doing so to prevent health issues and reduce overpopulation.</p>
          </li>
          <li className='mb-4'>
            <p className='font-bold tracking-wide'>Adoption Considerations:</p>
            <p>Adopt from a reputable shelter or rescue organization. They can provide valuable information about the pet's background, behavior, and health status.</p>
          </li>
          <li className='mb-4'>
            <p className='font-bold tracking-wide'>Be Mindful of Allergies:</p>
            <p>Make sure that no one in your household is allergic to the type of animal you plan to adopt.</p>
          </li>
          <li className='mb-4'>
            <p className='font-bold tracking-wide'>Stay Positive and Be Flexible:</p>
            <p>Building a strong bond with your new pet may take time, but staying positive and being flexible in your approach will help make the transition smoother for both of you.</p>
          </li>
          <li className='mb-4'>
            <p className='font-bold tracking-wide'>Enjoy the Journey:</p>
            <p>Embrace the joy and love that comes with pet ownership. Cherish the unforgettable moments and memories you'll create with your new companion.</p>
          </li>
        </ol>
        <p>
        By following these tips and guidelines, you can ensure a happy and fulfilling life for your newly adopted pet and make your journey as a first-time pet owner a remarkable and heartwarming experience. Remember, the love and devotion you invest in your furry friend will be returned to you tenfold. Happy adopting!
        </p>
      </div> */}
    </div>
  )
}