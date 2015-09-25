let Select = require('../src');
let {Option, OptGroup} = Select;

let children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

let tagChildren = [];
for (let i = 10; i < 36; i++) {
    tagChildren.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

let provinceData = ['浙江', '江苏'];
let cityData = {
  '浙江': ['杭州', '宁波', '温州'],
  '江苏': ['南京', '苏州', '镇江']
};

function handleChange(value) {
  console.log('selected ' + value);
}

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value1: "",
            value2: "",
            value3: "",
            value4: "",
            options: [],
            cities: cityData[provinceData[0]],
            secondCity:cityData[provinceData[0]][0]
        };
    }

    handleMailChange(value) {
        var options;
        if (!value || value.indexOf('@') >= 0) {
            options = [];
        } else {
            options = ['gmail.com', '163.com', 'qq.com'].map(function(domain) {
                var email = value + '@' + domain;
                return <Option key={email}>{email}</Option>;
            });
        }
        this.setState({
            options: options
        });
    }

    handleProvinceChange(value) {
        this.setState({
            cities: cityData[value],
            secondCity:cityData[value][0]
        });
    }
    onSecondCityChange(value) {
        this.setState({
            secondCity: value
        });
    }
    render() {
        let provinceOptions = provinceData.map(function(province) {
            return <Option key={province}>{province}</Option>;
        });
        let cityOptions = this.state.cities.map(function(city) {
            return <Option key={city}>{city}</Option>;
        });
        return (
            <div>
                <p>基本使用:</p>
                <Select defaultValue="lucy" style={{width:200}} onChange={handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="yiminghe">yiminghe</Option>
                </Select>
                <p>带搜索框:</p>
                <Select defaultValue="lucy" showSearch={true} style={{width:200}} searchPlaceholder="输入" onChange={handleChange}>
                    <Option value="jack">jack</Option>
                    <Option value="lucy">lucy</Option>
                    <Option value="disabled" disabled>disabled</Option>
                    <Option value="yiminghe">yiminghe</Option>
                </Select>
                <p>多选:</p>
                <Select multiple style={{width:400}} defaultValue={['a10', 'c12']} onChange={handleChange}>
                    {children}
                </Select>
                <p>标签:(标签的意义是，用户可以通过键盘自己输入值，而不局限于传入的选项)</p>
                <Select style={{width: '100%'}} searchPlaceholder="标签模式" tags onChange={handleChange}>
                    {tagChildren}
                </Select>
                <p>分组</p>
                <Select defaultValue="lucy"
                    style={{width:200}}
                    showSearch={false}
                    onChange={handleChange}>
                    <OptGroup label="Manager">
                        <Option value="jack">jack</Option>
                        <Option value="lucy">lucy</Option>
                    </OptGroup>
                    <OptGroup label="Engineer">
                        <Option value="yiminghe">yiminghe</Option>
                    </OptGroup>
                </Select>
                <p>智能提示</p>
                <Select combobox
                  style={{width:200}}
                  onChange={this.handleMailChange.bind(this)}
                  filterOption={false}
                  searchPlaceholder="请输入账户名">
                  {this.state.options}
                </Select>
                <p>联动</p>
                <Select defaultValue={provinceData[0]} style={{width:150}} onChange={this.handleProvinceChange.bind(this)}>
                    {provinceOptions}
                </Select>
                &nbsp;
                <Select value={this.state.secondCity} style={{width:150}} onChange={this.onSecondCityChange.bind(this)}>
                    {cityOptions}
                </Select>
            </div>
        )
    }
}

module.exports = Demo;
