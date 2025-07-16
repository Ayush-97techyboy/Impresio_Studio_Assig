'use client'; 
import { useSearchParams } from 'next/navigation';
import ProfilePage from '../../components/ProfilePage';

export default function Profile() {
  const searchParams = useSearchParams();
  const photographerId = searchParams.get('photographerId');
  return <ProfilePage photographerId={photographerId} />;
}
