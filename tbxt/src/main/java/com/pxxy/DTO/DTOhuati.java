package com.pxxy.DTO;

import java.io.Serializable;
import java.util.List;
import com.pxxy.pojo.huati;

public class DTOhuati implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private huati huati;
	private List<huati> huatiList;
	private int huatiNum;
	private List<?> NumList;
	public huati getHuati() {
		return huati;
	}
	public void setHuati(huati huati) {
		this.huati = huati;
	}
	public List<huati> getHuatiList() {
		return huatiList;
	}
	public void setHuatiList(List<huati> huatiList) {
		this.huatiList = huatiList;
	}
	public int getHuatiNum() {
		return huatiNum;
	}
	public void setHuatiNum(int huatiNum) {
		this.huatiNum = huatiNum;
	}
	public List<?> getNumList() {
		return NumList;
	}
	public void setNumList(List<?> numList) {
		NumList = numList;
	}
	
}
