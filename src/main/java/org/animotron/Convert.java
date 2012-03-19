/*
 *  Copyright (C) 2011-2012 The Animo Project
 *  http://animotron.org
 *  	
 *  This file is part of Animotron.
 *  
 *  Animotron is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as 
 *  published by the Free Software Foundation, either version 3 of 
 *  the License, or (at your option) any later version.
 *  
 *  Animotron is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *  
 *  You should have received a copy of 
 *  the GNU Affero General Public License along with Animotron.  
 *  If not, see <http://www.gnu.org/licenses/>.
 */
package org.animotron;

import com.ctc.wstx.stax.WstxInputFactory;
import org.animotron.expression.Expression;
import org.animotron.expression.XMLAnimoExpression;

import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import java.io.*;

import static org.animotron.graph.AnimoGraph.startDB;
import static org.animotron.graph.serializer.CachedSerializer.PRETTY_ANIMO;

/**
 * @author <a href="mailto:gazdovsky@gmail.com">Evgeny Gazdovsky</a>
 *
 */
public class Convert {

    private static final XMLInputFactory FACTORY = new WstxInputFactory();

    private static void copyFolder(File src, File dst) throws IOException, XMLStreamException {
        for (String i : src.list()) {
            File f = new File(src, i);
            File g = new File(dst, i);
            if (f.isDirectory()) {
                g.mkdir();
                copyFolder(f, g);
            } else {
                if (f.getName().endsWith(".animo"))
                copyFile(f, g);
            }
        }
    }
    
    private static void copyFile(File src, File dst) throws IOException, XMLStreamException {
        System.out.println(src.getPath());
        InputStream in = new FileInputStream(src);
        OutputStream out = new FileOutputStream(dst);
        Expression e = new XMLAnimoExpression(FACTORY.createXMLStreamReader(in));
        PRETTY_ANIMO.serialize(e, out);
        out.close();
    }

	public static void main( String[] args ) throws IOException, XMLStreamException {
        startDB("data");
        copyFolder(new File("xml"), new File("animo"));
	}

}
