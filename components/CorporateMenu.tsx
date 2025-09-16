function CorporateMenu() {
  const [boxes, setBoxes] = useState([{ id: 1, protein: '', side: 'fruit' }])
  
  const addBox = () => {
    setBoxes([...boxes, { id: boxes.length + 1, protein: '', side: 'fruit' }])
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 mb-4">
        <h2 className="text-2xl font-bold mb-2">FuelBox Corporate Lunch</h2>
        <p className="text-gray-600 mb-4">$20/box • Min 10 boxes • Free Vancouver delivery</p>
        
        {boxes.map((box, index) => (
          <div key={box.id} className="border-b pb-4 mb-4">
            <h3 className="font-semibold mb-2">Box #{index + 1}</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Protein</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Grilled Chicken</option>
                  <option>Meat Lovers</option>
                  <option>Beyond Meat</option>
                  <option>Falafel</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Side</label>
                <select className="w-full p-2 border rounded-lg">
                  <option value="fruit">Fruit Cup</option>
                  <option value="yogurt">Greek Yogurt</option>
                </select>
              </div>
            </div>
          </div>
        ))}
        
        <button 
          onClick={addBox}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400"
        >
          + Add Another Box
        </button>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between font-bold text-lg">
            <span>Total ({boxes.length} boxes):</span>
            <span>${boxes.length * 20}</span>
          </div>
        </div>
        
        <button 
          disabled={boxes.length < 10}
          className="w-full mt-4 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-bold disabled:opacity-50"
        >
          {boxes.length < 10 
            ? `Add ${10 - boxes.length} more boxes (min 10)` 
            : 'Proceed to Checkout'}
        </button>
      </div>
    </div>
  )
}
