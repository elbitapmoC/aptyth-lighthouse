'use client';

export default function CommunitySection() {
  const communityFeatures = [
    {
      title: 'Discussion Forums',
      description:
        'Engage in meaningful discussions with other believers and share your insights on scripture.',
      icon: '💬',
    },
    {
      title: 'Group Bible Studies',
      description:
        'Join or create group Bible studies to explore scripture together with friends and family.',
      icon: '📖',
    },
    {
      title: 'Prayer Requests',
      description:
        'Submit prayer requests and pray for others in the community to foster spiritual growth.',
      icon: '🙏',
    },
    {
      title: 'Events & Meetups',
      description:
        'Participate in local or virtual events to connect with like-minded individuals.',
      icon: '📅',
    },
  ];

  return (
    <section id="community" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Community Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {communityFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
