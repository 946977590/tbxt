import java.io.IOException;

import com.pxxy.utils.ImgCompress;

public class TestCompress {

	public static void main(String[] args) throws IOException {
		String storePath = "D:\\AUPLOAD\\images";
		String pic_name = "5c1a13ffafd6d.jpg";
		ImgCompress.pictrueName = pic_name;
		ImgCompress imgCom = new ImgCompress(storePath+"\\"+pic_name);
    	imgCom.resizeFix(400, 400);
    	System.out.println("Ñ¹Ëõ³É¹¦");
	}
}
