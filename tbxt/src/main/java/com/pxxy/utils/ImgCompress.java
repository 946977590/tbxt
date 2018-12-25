package com.pxxy.utils;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import com.sun.image.codec.jpeg.*;

import javax.imageio.ImageIO;

public class ImgCompress {
    private Image img;
    private int width;
    private int height;
    public static String pictrueName;
 /*   public String getPictrueName() {
		return pictrueName;
	}
	public void setPictrueName(String pictrueName) {
		this.pictrueName = pictrueName;
	}*/
	@SuppressWarnings("deprecation")
    public static void main(String[] args) throws Exception {
		pictrueName = "5c1a13ffafd6d.jpg";
        ImgCompress imgCom = new ImgCompress("D:\\AUPLOAD\\images\\5c1a13ffafd6d.jpg");
        imgCom.resizeFix(400, 400);
//		String storePath = "D:\\AUPLOAD\\images";
//		String pic_name = "c9b49a4a-bb31-4a0e-bdc6-3b849a37f24521wewqg.jpg";
//		ImgCompress imgCom = new ImgCompress("D:\\AUPLOAD\\images\\c9b49a4a-bb31-4a0e-bdc6-3b849a37f24521wewqg.jpg");
//    	imgCom.resizeFix(400, 400, pic_name);
//    	System.out.println("ѹ���ɹ�");
    }
    /**
     * ���캯��
     */
    public ImgCompress(String fileName) throws IOException {
//    	System.out.println("==="+fileName);
        File file = new File(fileName);// �����ļ�
        img = ImageIO.read(file);      // ����Image����
        width = img.getWidth(null);    // �õ�Դͼ��
        height = img.getHeight(null);  // �õ�Դͼ��
        
    }
    /**
     * ���տ�Ȼ��Ǹ߶Ƚ���ѹ��
     * @param w int �����
     * @param h int ���߶�
     */
    public void resizeFix(int w, int h) throws IOException {
        if (width / height > w / h) {
            resizeByWidth(w);
        } else {
            resizeByHeight(h);
        }
    }
    /**
     * �Կ��Ϊ��׼���ȱ�������ͼƬ
     * @param w int �¿��
     */
    public void resizeByWidth(int w) throws IOException {
        int h = (int) (height * w / width);
        resize(w, h);
    }
    /**
     * �Ը߶�Ϊ��׼���ȱ�������ͼƬ
     * @param h int �¸߶�
     */
    public void resizeByHeight(int h) throws IOException {
        int w = (int) (width * h / height);
        resize(w, h );
    }
    /**
     * ǿ��ѹ��/�Ŵ�ͼƬ���̶��Ĵ�С
     * @param w int �¿��
     * @param h int �¸߶�
     */
    public void resize(int w, int h) throws IOException {
        // SCALE_SMOOTH �������㷨 ��������ͼƬ��ƽ���ȵ� ���ȼ����ٶȸ� ���ɵ�ͼƬ�����ȽϺ� ���ٶ���
        BufferedImage image = new BufferedImage(w, h,BufferedImage.TYPE_INT_RGB ); 
        image.getGraphics().drawImage(img, 0, 0, w, h, null); // ������С���ͼ
        File destFile = new File("D:\\AUPLOAD\\images\\"+pictrueName); 
        FileOutputStream out = new FileOutputStream(destFile); // ������ļ���
        // ��������ʵ��bmp��png��gifתjpg
        JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);
        encoder.encode(image); // JPEG����
        out.close();
    }
}
