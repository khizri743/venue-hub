import React from 'react'

interface statItem {
    number: string;
    content: string;
}

interface StatsSectionProps {
    items: statItem[];
}

const StatsSection = ({items}: StatsSectionProps) => {


  return (
    <section className="py-12 px-4 bg-white">
        {/* Using Grid ensures all boxes are the same width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            
            {items.map((item, index) => (
                <div 
                    key={index} 
                    className="flex flex-col items-center justify-center py-10 px-4 rounded-2xl border border-amber-300 bg-white"
                >
                    {/* The Number/Stat */}
                    <h3 className="text-3xl font-bold text-amber-500 mb-2">
                        {item.number}
                    </h3>
                    
                    {/* The Label */}
                    <p className="text-2xl font-bold text-gray-500 text-center">
                        {item.content}
                    </p>
                </div>
            ))}

        </div>
    </section>
  )
}

export default StatsSection