import { allWaves } from '@/lib/curriculum';
import CertificateClient from './CertificateClient';

export function generateStaticParams() {
  return [
    { waveId: 'wave-1' },
    { waveId: 'wave-2' },
    { waveId: 'wave-3' },
    { waveId: 'wave-4' },
    { waveId: 'wave-5' },
    { waveId: 'wave-6' },
    { waveId: 'wave-7' },
    { waveId: 'wave-8' },
    { waveId: 'wave-9' },
  ];
}

export default async function CertificatePage({ params }: { params: Promise<{ waveId: string }> }) {
  const { waveId } = await params;
  const wave = allWaves.find(w => w.id === waveId);

  if (!wave) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/50">Wave not found.</p>
      </div>
    );
  }

  const nextWave = allWaves.find(w => w.number === wave.number + 1);

  return (
    <CertificateClient
      wave={wave}
      nextWaveId={nextWave?.id ?? null}
    />
  );
}
