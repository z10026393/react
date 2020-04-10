import React from "react";
import propTypes from "prop-types"
import {withRouter} from 'react-router-dom'
import  styles from './uc-input.module.css'
export default class UcInput extends React.Component{
    /*
  * type   类型         text
  * model  双向绑定模式  null  |   {value,name,onChange}
  * multi  多行输入     false
  * label  标题         ''
  * style  行间样式     {}
  * */
    state={

    }
    static defaultProps = {
        type: 'text',
        model: null,
        multi: false,
        label: '',
        style: {}
    };
    static propTypes = {
        type: propTypes.string,
        model: propTypes.shape({
            name: propTypes.string.isRequired,
            value: propTypes.string.isRequired,
            onChange: propTypes.func.isRequired
        }),
        multi: propTypes.bool,
        label: propTypes.string,
        style: propTypes.object
    };
    //标题 纯 渲染
    renderSpan=(label)=>{
        return label ? <span>{label}</span> : null
    };
    //单行输入框渲染
    renderInput = () => {
        let {model, type, label,style} = this.props;

        let inputEle = null;

        //生成非受控元素
        if (!model) {
            inputEle = (
                <div className={styles.ucInput} style={style}>
                    <input type={type} defaultValue="" style={{paddingLeft: label ? '1.24rem' : '0.24rem'}}/>
                    {this.renderSpan(label)}
                </div>
            );

            return inputEle;
        }


        let {model: {name, value, onChange}} = this.props;

        //生成一个受控元素
        inputEle = (
            <div className={styles.ucInput}  style={style}>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    name={name}
                    style={{paddingLeft: label ? '1.24rem' : '0.24rem'}}
                />
                {this.renderSpan(label)}
            </div>
        );

        return inputEle;

    };

    //多行输入框渲染
    renderTextarea = () => {

        let {model,label} = this.props;
        let multiEle = null;

        if (!model){
            multiEle = (
                <div>
                    {this.renderSpan(label)}
                    <textarea></textarea>
                </div>
            );
            return multiEle
        }

        let {model: {name, value, onChange}} = this.props;

        multiEle = (
            <div>
                {this.renderSpan(label)}
                <textarea
                    value={value}
                    onChange={onChange}
                    name={name}
                ></textarea>
            </div>
        );

        return multiEle;
    };
    render() {
        let {multi} = this.props;
        return multi ? this.renderTextarea() : this.renderInput()
    }
}