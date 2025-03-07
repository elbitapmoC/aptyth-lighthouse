'use client';

export default function Features() {
  const features = [
    {
      title: 'Comprehensive Bible Search',
      description:
        'Quickly find verses, chapters, and keywords with our powerful search functionality.',
      icon: '🔍',
    },
    {
      title: 'Cross-Referencing',
      description:
        'Easily explore related verses and passages to deepen your understanding.',
      icon: '🔗',
    },
    {
      title: 'Customizable Reading Plans',
      description:
        'Create and follow personalized reading plans to stay consistent in your study.',
      icon: '📅',
    },
    {
      title: 'Community Insights',
      description:
        'Engage with a community of believers and share insights on scripture.',
      icon: '💬',
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
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
