package fr.redfroggy.hmac.configuration.security;

import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.*;

public class WrappedRequest extends HttpServletRequestWrapper {
    private byte[] buffer = null;

    public WrappedRequest(HttpServletRequest req) throws IOException {
        super(req);
        // Read InputStream and store its content in a buffer.
        InputStream is = req.getInputStream();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        byte buf[] = new byte[1024];
        int read;
        while ((read = is.read(buf)) > 0) {
            baos.write(buf, 0, read);
        }
        this.buffer = baos.toByteArray();
    }

    @Override
    public ServletInputStream getInputStream() {
        ByteArrayInputStream bais = new ByteArrayInputStream(this.buffer);
        return new BufferedServletInputStream(bais);
    }

    public String getBody() throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(
                this.getInputStream()));
        String line;
        StringBuilder inputBuffer = new StringBuilder();
        do {
            line = reader.readLine();
            if (null != line) {
                inputBuffer.append(line.trim());
            }
        } while (line != null);
        reader.close();
        return inputBuffer.toString().trim();
    }

    private static final class BufferedServletInputStream extends ServletInputStream {

        private ByteArrayInputStream bais;

        BufferedServletInputStream(ByteArrayInputStream bais) {
            this.bais = bais;
        }

        @Override
        public int available() {
            return this.bais.available();
        }

        @Override
        public int read() {
            return this.bais.read();
        }

        @Override
        public int read(byte[] buf, int off, int len) {
            return this.bais.read(buf, off, len);
        }

        @Override
        public boolean isFinished() {
            return false;
        }

        @Override
        public boolean isReady() {
            return false;
        }

        @Override
        public void setReadListener(ReadListener readListener) {

        }
    }
}