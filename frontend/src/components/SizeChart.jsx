// SizeChart.js

const SizeChart = () => {
  return (
    <div>
      <h2>Size Chart</h2>
      <table>
        <thead>
          <tr>
            <th>Size</th>
            <th>Chest (inches)</th>
            <th>Waist (inches)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Small</td>
            <td>34-36</td>
            <td>28-30</td>
          </tr>
          <tr>
            <td>Medium</td>
            <td>38-40</td>
            <td>32-34</td>
          </tr>
          <tr>
            <td>Large</td>
            <td>42-44</td>
            <td>36-38</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SizeChart;
