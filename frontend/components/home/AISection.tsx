'use client';

export default function AISection() {
  const aiFeatures = [
    {
      title: 'AI-Powered Search',
      description:
        'Leverage advanced AI algorithms to find relevant verses and insights with ease.',
      icon: '🤖',
    },
    {
      title: 'Contextual Analysis',
      description:
        'Understand scripture in depth with AI-driven contextual analysis and commentary.',
      icon: '📖',
    },
    {
      title: 'Personalized Recommendations',
      description:
        'Receive tailored reading plans and study suggestions based on your preferences.',
      icon: '✨',
    },
    {
      title: 'Voice Interaction',
      description:
        'Interact with the platform using voice commands for a hands-free experience.',
      icon: '🎙️',
    },
  ];

  return (
    <section id="ai" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          AI Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aiFeatures.map((feature, index) => (
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
