/*
 *  Copyright (C) 2011 The Animo Project
 *  http://animotron.org
 *
 *  This program is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public License
 *  as published by the Free Software Foundation; either version 3
 *  of the License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 */
package org.animotron.repo;

import java.io.File;

import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;

import org.animotron.graph.stax.StAXGraphBuilder;

import com.ctc.wstx.stax.WstxInputFactory;

/**
 * Repository loader
 * 
 * @author <a href="mailto:gazdovsky@gmail.com">Evgeny Gazdovsky</a>
 *
 */
public class Repository {
	
	private final static WstxInputFactory INPUT_FACTORY = new WstxInputFactory();

	public static void load (String path) throws XMLStreamException {
		load(new File(path));
	}
	
	public static void load (File path) throws XMLStreamException {
		
		if (path.isDirectory()) {
			for (File file : path.listFiles()) {
				load(file);
			}
		} else {
			XMLStreamReader sr = INPUT_FACTORY.createXMLStreamReader(path);
			StAXGraphBuilder builder = new StAXGraphBuilder(sr);
			builder.build();
		}
		
	}
	
}
